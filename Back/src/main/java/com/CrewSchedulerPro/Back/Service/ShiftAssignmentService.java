package com.CrewSchedulerPro.Back.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CrewSchedulerPro.Back.Repository.ShiftAssignmentRepository;
import com.CrewSchedulerPro.Back.Model.ShiftAssignment;

import java.util.List;

@Service
public class ShiftAssignmentService {

    @Autowired
    private ShiftAssignmentRepository shiftAssignmentRepository;

    public ShiftAssignment assignShift(ShiftAssignment shiftAssignment) {
        // Implement any business rules before assigning a shift
        return shiftAssignmentRepository.save(shiftAssignment);
    }

    public List<ShiftAssignment> findAllAssignments() {
        return shiftAssignmentRepository.findAll();
    }

    // Additional logic for managing shift assignments goes here
}
