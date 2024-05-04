package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.HolidayRequest;
import com.Crewing.BackEnd.Repositories.HolidayRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HolidayRequestServiceImpl implements HolidayRequestService {

    @Autowired
    private HolidayRequestRepository holidayRequestRepository;

    @Override
    public HolidayRequest saveHolidayRequest(HolidayRequest holidayRequest) {
        return holidayRequestRepository.save(holidayRequest);
    }

    @Override
    public HolidayRequest getHolidayRequestById(Long id) {
        return holidayRequestRepository.findById(id).orElse(null);
    }

    @Override
    public List<HolidayRequest> getAllHolidayRequests() {
        return holidayRequestRepository.findAll();
    }

    @Override
    public void deleteHolidayRequest(Long id) {
        holidayRequestRepository.deleteById(id);
    }

    @Override
    public List<HolidayRequest> getHolidayRequestsByCrewMemberId(Long crewMemberId) {
        return holidayRequestRepository.findByCrewMember_Id(crewMemberId);
    }
}