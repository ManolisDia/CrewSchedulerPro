package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CrewSchedulerPro.Back.Model.Shifts;
import com.CrewSchedulerPro.Back.Service.ShiftsService;

import java.util.List;

@RestController
@RequestMapping("/api/coordinator/shifts")
public class CoordinatorShiftsController {

    @Autowired
    private ShiftsService shiftsService;

    @PostMapping("/create")
    public ResponseEntity<Shifts> createShift(@RequestBody Shifts shift) {
        Shifts createdShift = shiftsService.saveOrUpdateShift(shift);
        return ResponseEntity.ok(createdShift);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Shifts>> listAllShifts() {
        List<Shifts> shifts = shiftsService.findAllShifts();
        return ResponseEntity.ok(shifts);
    }
}