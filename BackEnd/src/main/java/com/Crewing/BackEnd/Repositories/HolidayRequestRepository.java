package com.Crewing.BackEnd.Repositories;

import com.Crewing.BackEnd.Models.HolidayRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HolidayRequestRepository extends JpaRepository<HolidayRequest, Long> {
    List<HolidayRequest> findByCrewMember_Id(Long crewMemberId);
}