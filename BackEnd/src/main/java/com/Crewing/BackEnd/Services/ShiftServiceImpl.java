package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Repositories.ShiftRepository;
import com.Crewing.BackEnd.Services.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftServiceImpl implements ShiftService {

    @Autowired
    private ShiftRepository shiftRepository;

    @Override
    public Shift saveShift(Shift shift) {
        System.out.println("Saving shift: " + shift);
        return shiftRepository.save(shift);
    }

    @Override
    public Shift getShiftById(Long id) {
        return shiftRepository.findById(id).orElse(null);
    }

    @Override
    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
    }

    @Override
    public List<Shift> getShiftsByDate(String date) {
        return shiftRepository.findByDate(date);
    }

    @Override
    public void deleteShift(Long id) {
        shiftRepository.deleteById(id);
    }
}