package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.Shift;

import java.util.List;

public interface ShiftService {
    Shift saveShift(Shift shift);
    Shift getShiftById(Long id);
    List<Shift> getAllShifts();
    List<Shift> getShiftsByDate(String date);
    void deleteShift(Long id);
    List<Shift> findShiftsByCrewMemberId(Long crewMemberId);
}