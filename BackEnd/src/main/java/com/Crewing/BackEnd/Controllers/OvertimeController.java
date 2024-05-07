package com.Crewing.BackEnd.Controllers;

import com.Crewing.BackEnd.Models.Overtime;
import com.Crewing.BackEnd.Services.OvertimeService;
import com.Crewing.BackEnd.DTO.OvertimeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/api/overtime")
public class OvertimeController {

    private static final Logger logger = LoggerFactory.getLogger(OvertimeController.class);

    @Autowired
    private OvertimeService overtimeService;

    @PostMapping
    public ResponseEntity<?> createOvertime(@RequestBody OvertimeDTO overtimeDTO) {
        logger.debug("Received request to create overtime with details: {}", overtimeDTO);
        try {
            Overtime createdOvertime = overtimeService.saveOvertime(overtimeDTO);
            logger.info("Overtime created successfully with ID: {}", createdOvertime.getId());
            return new ResponseEntity<>(createdOvertime, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Failed to create overtime due to: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Overtime>> getAllOvertimes() {
        List<Overtime> overtimes = overtimeService.getAllOvertimes();
        return new ResponseEntity<>(overtimes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Overtime> getOvertimeById(@PathVariable Long id) {
        Overtime overtime = overtimeService.getOvertimeById(id);
        return overtime != null ? new ResponseEntity<>(overtime, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/shift/{shiftId}")
    public ResponseEntity<List<Overtime>> getOvertimesByShift(@PathVariable Long shiftId) {
        List<Overtime> overtimes = overtimeService.getOvertimesByShiftId(shiftId);
        return new ResponseEntity<>(overtimes, HttpStatus.OK);
    }

    @GetMapping("/crew/{crewMemberId}")
    public ResponseEntity<List<Overtime>> getOvertimesByCrewMember(@PathVariable Long crewMemberId) {
        List<Overtime> overtimes = overtimeService.getOvertimesByCrewMemberId(crewMemberId);
        return new ResponseEntity<>(overtimes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOvertime(@PathVariable Long id) {
        try {
            overtimeService.deleteOvertime(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error deleting overtime record: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/crew/{crewMemberId}/shift/{shiftId}")
    public ResponseEntity<?> deleteOvertimeByCrewMemberAndShift(@PathVariable Long crewMemberId, @PathVariable Long shiftId) {
        logger.debug("Attempting to delete overtime for crew member ID {} on shift ID {}", crewMemberId, shiftId);
        try {
            boolean isDeleted = overtimeService.deleteOvertimeByCrewMemberAndShift(crewMemberId, shiftId);
            if (isDeleted) {
                logger.info("Successfully deleted overtime request for crew member ID {} on shift ID {}", crewMemberId, shiftId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                logger.info("No overtime request found or already deleted for crew member ID {} on shift ID {}", crewMemberId, shiftId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("Failed to delete overtime request due to: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
