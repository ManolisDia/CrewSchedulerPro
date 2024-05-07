package com.Crewing.BackEnd.Repositories;

import com.Crewing.BackEnd.Models.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findByDate(String date);
    List<Shift> findByCrewMembers_Id(Long crewMemberId);

    @Query("SELECT s FROM Shift s WHERE s.requiredCrewMembers > (SELECT COUNT(c) FROM s.crewMembers c)")
    List<Shift> findShiftsWithIncompleteCrew();
}
