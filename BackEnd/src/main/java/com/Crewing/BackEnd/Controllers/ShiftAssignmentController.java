package com.Crewing.BackEnd.Controllers;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Models.ShiftAssignment;
import com.Crewing.BackEnd.Services.CrewMemberService;
import com.Crewing.BackEnd.Services.ShiftAssignmentService;
import com.Crewing.BackEnd.Services.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class ShiftAssignmentController {

    @Autowired
    private ShiftAssignmentService shiftAssignmentService;

    @Autowired
    private CrewMemberService crewMemberService;

    @Autowired
    private ShiftService shiftService;

    @PostMapping
    public ResponseEntity<ShiftAssignment> assignShift(@RequestBody ShiftAssignment shiftAssignment) {
        Long crewMemberId = shiftAssignment.getCrewMember().getId();
        Long shiftId = shiftAssignment.getShift().getId();

        CrewMember crewMember = crewMemberService.getCrewMemberById(crewMemberId);
        Shift shift = shiftService.getShiftById(shiftId);

        if (crewMember != null && shift != null) {
            ShiftAssignment savedAssignment = shiftAssignmentService.assignShift(crewMember, shift);
            return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/crewmember/{id}")
    public ResponseEntity<List<ShiftAssignment>> getAssignmentsForCrewMember(@PathVariable Long id) {
        CrewMember crewMember = crewMemberService.getCrewMemberById(id);
        if (crewMember != null) {
            List<ShiftAssignment> assignments = shiftAssignmentService.getAssignmentsForCrewMember(crewMember);
            return new ResponseEntity<>(assignments, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/shift/{id}")
    public ResponseEntity<List<ShiftAssignment>> getAssignmentsForShift(@PathVariable Long id) {
        Shift shift = shiftService.getShiftById(id);
        if (shift != null) {
            List<ShiftAssignment> assignments = shiftAssignmentService.getAssignmentsForShift(shift);
            return new ResponseEntity<>(assignments, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        shiftAssignmentService.deleteAssignment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}