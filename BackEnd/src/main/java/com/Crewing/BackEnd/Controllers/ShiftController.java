package com.Crewing.BackEnd.Controllers;

import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Services.ShiftService;
import com.Crewing.BackEnd.Services.CrewMemberService; // Import the CrewMemberService
import com.Crewing.BackEnd.Models.CrewMember;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {

    private static final Logger logger = LoggerFactory.getLogger(ShiftController.class);

    

    @Autowired
    private ShiftService shiftService;

    @Autowired
    private CrewMemberService crewMemberService; // Inject the CrewMemberService


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/crew/{crewMemberId}")
    public ResponseEntity<List<Shift>> getShiftsByCrewMember(@PathVariable Long crewMemberId) {
        List<Shift> shifts = shiftService.findShiftsByCrewMemberId(crewMemberId);
        return new ResponseEntity<>(shifts, HttpStatus.OK);
    }
    
    
    @PostMapping
    public ResponseEntity<Shift> createShift(@RequestBody Shift shift) {
        try {
            // Log the raw request body
            logger.info("Received shift request body: {}", shift);

            // Log specific fields to verify their values
            logger.info("Received shift - address: {}", shift.getAddress());
            logger.info("Received shift - postcode: {}", shift.getPostcode());
            logger.info("Received shift - requiredCrewMembers: {}", shift.getRequiredCrewMembers());
            // Add similar logging statements for other fields as needed

            // Proceed with saving the shift
            Shift savedShift = shiftService.saveShift(shift);
            logger.info("Shift saved successfully: {}", savedShift);

            // Send a message to the appropriate topic
            String message = String.format("New shift created: %s", savedShift.toString());
            messagingTemplate.convertAndSend("/topic/newShifts", message);

            return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error saving shift: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Shift> getShiftById(@PathVariable Long id) {
        Shift shift = shiftService.getShiftById(id);
        return shift != null
                ? new ResponseEntity<>(shift, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/addOvertime/{shiftId}")
    public ResponseEntity<Shift> addOvertimeToShift(@PathVariable Long shiftId, @RequestParam Integer overtimeHours) {
        Shift shift = shiftService.getShiftById(shiftId);
        if (shift == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shift.setOvertimeHours(shift.getOvertimeHours() != null ? shift.getOvertimeHours() + overtimeHours : overtimeHours);
        Shift updatedShift = shiftService.saveShift(shift);
        return new ResponseEntity<>(updatedShift, HttpStatus.OK);
    }

    @GetMapping("/incomplete")
public ResponseEntity<List<Shift>> getIncompleteShifts() {
    try {
        List<Shift> incompleteShifts = shiftService.findShiftsWithIncompleteCrew();
        if (incompleteShifts.isEmpty()) {
            logger.info("No incomplete shifts found");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        logger.info("Retrieved incomplete shifts: {}", incompleteShifts.size());
        return new ResponseEntity<>(incompleteShifts, HttpStatus.OK);
    } catch (Exception e) {
        logger.error("Error retrieving incomplete shifts: {}", e.getMessage());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    

    @GetMapping
    public ResponseEntity<List<Shift>> getAllShifts() {
        List<Shift> shifts = shiftService.getAllShifts();
        return new ResponseEntity<>(shifts, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shift> updateShift(@PathVariable Long id, @RequestBody Shift shift) {
        shift.setId(id);
        Shift updatedShift = shiftService.saveShift(shift);
        return new ResponseEntity<>(updatedShift, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShift(@PathVariable Long id) {
        shiftService.deleteShift(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    @PostMapping("/addCrew/{shiftId}/{crewMemberId}")
    public ResponseEntity<?> addCrewMemberToShift(@PathVariable Long shiftId, @PathVariable Long crewMemberId) {
        logger.info("LOOK HERE");
        logger.info("Attempting to add crew member with ID {} to shift with ID {}", crewMemberId, shiftId);
        try {
            // Attempt to add the crew member to the shift
            Shift updatedShift = shiftService.addCrewMemberToShift(shiftId, crewMemberId);
            logger.info("Crew member added to shift successfully");

            // Fetch the crew member details
            CrewMember crewMember = crewMemberService.getCrewMemberById(crewMemberId);
            if (crewMember == null) {
                logger.error("Failed to find crew member with ID {}", crewMemberId);
                return ResponseEntity.badRequest().body("Crew member not found");
            }
            logger.info("Fetched crew member details: {}", crewMember);

            // Prepare message for WebSocket
            String crewName = crewMember.getName();
            String shiftAddress = updatedShift.getAddress();
            String shiftDate = updatedShift.getDate().toString();  // Assuming getDate returns a LocalDate or similar
            logger.info("Preparing message for WebSocket: Crew Name: {}, Shift Address: {}, Shift Date: {}", crewName, shiftAddress, shiftDate);

            String message = String.format("%s has accepted shift at %s on %s", crewName, shiftAddress, shiftDate);
            messagingTemplate.convertAndSend("/topic/notifications", message);
            logger.info("WebSocket message sent: {}", message);

            return ResponseEntity.ok(updatedShift);
        } catch (Exception e) {
            logger.error("Error adding crew member to shift: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}