package com.Crewing.BackEnd.Repositories;

import com.Crewing.BackEnd.Models.Overtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface OvertimeRepository extends JpaRepository<Overtime, Long> {
    List<Overtime> findByShift_Id(Long shiftId);
    List<Overtime> findByCrewMember_Id(Long crewMemberId);
    Optional<Overtime> findByCrewMember_IdAndShift_Id(Long crewMemberId, Long shiftId); // New method
}
