package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CrewSchedulerPro.Back.Model.Shifts;
import com.CrewSchedulerPro.Back.Service.ShiftsService;

import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftsController {

    @Autowired
    private ShiftsService shiftsService;

    @PostMapping("/create")
    public ResponseEntity<Shifts> createOrUpdateShift(@RequestBody Shifts shift) {
        Shifts savedShift = shiftsService.saveOrUpdateShift(shift);
        return ResponseEntity.ok(savedShift);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shifts> getShiftById(@PathVariable Long id) {
        return shiftsService.findShiftById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/list")
    public ResponseEntity<List<Shifts>> listAllShifts() {
        List<Shifts> shifts = shiftsService.findAllShifts();
        return ResponseEntity.ok(shifts);
    }
}
