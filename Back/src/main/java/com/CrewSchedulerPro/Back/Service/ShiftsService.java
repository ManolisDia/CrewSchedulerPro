package com.CrewSchedulerPro.Back.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CrewSchedulerPro.Back.Repository.ShiftsRepository;
import com.CrewSchedulerPro.Back.Model.Shifts;

import java.util.List;

@Service
public class ShiftsService {

    @Autowired
    private ShiftsRepository shiftsRepository;

    public Shifts saveOrUpdateShift(Shifts shift) {
        // Add any validation or business logic here
        return shiftsRepository.save(shift);
    }

    public java.util.Optional<Shifts> findShiftById(Long id) {
        return shiftsRepository.findById(id);
    }

    public List<Shifts> findAllShifts() {
        return shiftsRepository.findAll();
    }

    // Additional methods for shift management can be added here
}
