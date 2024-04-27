package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Models.ShiftAssignment;
import com.Crewing.BackEnd.Repositories.ShiftAssignmentRepository;
import com.Crewing.BackEnd.Services.ShiftAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftAssignmentServiceImpl implements ShiftAssignmentService {

    @Autowired
    private ShiftAssignmentRepository shiftAssignmentRepository;

    @Override
    public ShiftAssignment assignShift(CrewMember crewMember, Shift shift) {
        ShiftAssignment shiftAssignment = new ShiftAssignment();
        shiftAssignment.setCrewMember(crewMember);
        shiftAssignment.setShift(shift);
        return shiftAssignmentRepository.save(shiftAssignment);
    }

    @Override
    public List<ShiftAssignment> getAssignmentsForCrewMember(CrewMember crewMember) {
        return shiftAssignmentRepository.findByCrewMember(crewMember);
    }

    @Override
    public List<ShiftAssignment> getAssignmentsForShift(Shift shift) {
        return shiftAssignmentRepository.findByShift(shift);
    }

    @Override
    public void deleteAssignment(Long id) {
        shiftAssignmentRepository.deleteById(id);
    }
}