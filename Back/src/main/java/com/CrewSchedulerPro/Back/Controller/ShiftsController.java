package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CrewSchedulerPro.Back.Model.CrewmanLogIn;
import com.CrewSchedulerPro.Back.Model.Shifts;
import com.CrewSchedulerPro.Back.Service.CrewmanLogInService;
import com.CrewSchedulerPro.Back.Service.ShiftAssignmentService;
import com.CrewSchedulerPro.Back.Service.ShiftsService;

import java.util.List;

@RestController
@RequestMapping("/api/crew/shifts")
public class ShiftsController {

    @Autowired
    private ShiftsService shiftsService;

    @Autowired
    private CrewmanLogInService crewmanLogInService;

    @Autowired
    private ShiftAssignmentService shiftAssignmentService;

    @GetMapping("/list")
    public ResponseEntity<List<Shifts>> listAllShifts(@RequestParam String crewmanUsername) {
        CrewmanLogIn crewmanLogIn = crewmanLogInService.findByUsername(crewmanUsername);
        if (crewmanLogIn != null) {
            List<Shifts> assignedShifts = shiftAssignmentService.findShiftsByCrewmanLogin(crewmanLogIn);
            return ResponseEntity.ok(assignedShifts);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptShift(@RequestParam Long shiftId, @RequestParam String crewmanUsername) {
        CrewmanLogIn crewmanLogIn = crewmanLogInService.findByUsername(crewmanUsername);
        if (crewmanLogIn != null) {
            Shifts shift = shiftsService.findShiftById(shiftId).orElse(null);
            if (shift != null) {
                shiftAssignmentService.assignShift(crewmanLogIn, shift);
                return ResponseEntity.ok("Shift accepted successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid shift ID");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid crewman username");
        }
    }
}