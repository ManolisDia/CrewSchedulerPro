package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.Shift;

import java.time.LocalDate;
import java.util.List;

public interface ShiftService {
    Shift saveShift(Shift shift);
    Shift getShiftById(Long id);
    List<Shift> getAllShifts();
    List<Shift> getShiftsByDate(LocalDate date);
    void deleteShift(Long id);
}