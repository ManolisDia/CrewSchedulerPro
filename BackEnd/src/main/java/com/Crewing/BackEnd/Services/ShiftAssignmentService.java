package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Models.ShiftAssignment;

import java.util.List;

public interface ShiftAssignmentService {
    ShiftAssignment assignShift(CrewMember crewMember, Shift shift);
    List<ShiftAssignment> getAssignmentsForCrewMember(CrewMember crewMember);
    List<ShiftAssignment> getAssignmentsForShift(Shift shift);
    void deleteAssignment(Long id);
}