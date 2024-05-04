package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.HolidayRequest;
import java.util.List;

public interface HolidayRequestService {
    HolidayRequest saveHolidayRequest(HolidayRequest holidayRequest);
    HolidayRequest getHolidayRequestById(Long id);
    List<HolidayRequest> getAllHolidayRequests();
    void deleteHolidayRequest(Long id);
    List<HolidayRequest> getHolidayRequestsByCrewMemberId(Long crewMemberId);
}