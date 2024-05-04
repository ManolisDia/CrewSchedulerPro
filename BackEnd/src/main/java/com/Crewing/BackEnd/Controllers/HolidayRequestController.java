package com.Crewing.BackEnd.Controllers;

import com.Crewing.BackEnd.Models.HolidayRequest;
import com.Crewing.BackEnd.Services.HolidayRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holidayRequests")
public class HolidayRequestController {

    @Autowired
    private HolidayRequestService holidayRequestService;

    @PostMapping
    public ResponseEntity<HolidayRequest> createHolidayRequest(@RequestBody HolidayRequest holidayRequest) {
        HolidayRequest createdRequest = holidayRequestService.saveHolidayRequest(holidayRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HolidayRequest> getHolidayRequestById(@PathVariable Long id) {
        HolidayRequest holidayRequest = holidayRequestService.getHolidayRequestById(id);
        return holidayRequest != null ? new ResponseEntity<>(holidayRequest, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/crew/{crewMemberId}")
    public ResponseEntity<List<HolidayRequest>> getHolidayRequestsByCrewMember(@PathVariable Long crewMemberId) {
        List<HolidayRequest> requests = holidayRequestService.getHolidayRequestsByCrewMemberId(crewMemberId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHolidayRequest(@PathVariable Long id) {
        holidayRequestService.deleteHolidayRequest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
