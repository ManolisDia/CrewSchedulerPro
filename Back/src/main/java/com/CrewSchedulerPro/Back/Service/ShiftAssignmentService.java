package com.CrewSchedulerPro.Back.Service;

import com.CrewSchedulerPro.Back.Model.CrewmanLogIn;
import com.CrewSchedulerPro.Back.Model.ShiftAssignment;
import com.CrewSchedulerPro.Back.Model.Shifts;

import java.util.List;

public interface ShiftAssignmentService {

    ShiftAssignment assignShift(ShiftAssignment shiftAssignment);
    List<ShiftAssignment> findAllAssignments();
    List<ShiftAssignment> findAssignmentsByCrewmanLogin(CrewmanLogIn crewmanLogin);
    List<ShiftAssignment> findAssignmentsByShift(Shifts shift);
}