package com.Crewing.BackEnd.Repositories;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Models.ShiftAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftAssignmentRepository extends JpaRepository<ShiftAssignment, Long> {
    List<ShiftAssignment> findByCrewMember(CrewMember crewMember);
    List<ShiftAssignment> findByShift(Shift shift);
    // You can add more custom query methods here if needed
}