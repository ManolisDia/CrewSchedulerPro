package com.CrewSchedulerPro.Back.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CrewSchedulerPro.Back.Model.ShiftAssignment;

import java.util.List;

public interface ShiftAssignmentRepository extends JpaRepository<ShiftAssignment, Long> {
    // Methods to find assignments by crewman and/or shift
    List<ShiftAssignment> findByCrewmanLoginId(Long crewmanLoginId);
    List<ShiftAssignment> findByShiftId(Long shiftId);
}
