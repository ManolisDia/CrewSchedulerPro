package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CrewSchedulerPro.Back.Model.ShiftAssignment;
import com.CrewSchedulerPro.Back.Service.ShiftAssignmentService;

import java.util.List;

@RestController
@RequestMapping("/api/shiftAssignments")
public class ShiftAssignmentController {

    @Autowired
    private ShiftAssignmentService shiftAssignmentService;

    @PostMapping("/assign")
    public ResponseEntity<ShiftAssignment> assignShiftToCrewman(@RequestBody ShiftAssignment shiftAssignment) {
        ShiftAssignment assignedShift = shiftAssignmentService.assignShift(shiftAssignment);
        return ResponseEntity.ok(assignedShift);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ShiftAssignment>> listAllAssignments() {
        List<ShiftAssignment> assignments = shiftAssignmentService.findAllAssignments();
        return ResponseEntity.ok(assignments);
    }
}
