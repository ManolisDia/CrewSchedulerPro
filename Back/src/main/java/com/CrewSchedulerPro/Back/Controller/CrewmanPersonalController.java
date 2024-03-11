package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CrewSchedulerPro.Back.Model.CrewmanPersonal;
import com.CrewSchedulerPro.Back.Service.CrewmanPersonalService;

import java.util.List;

@RestController
@RequestMapping("/api/crewman")
public class CrewmanPersonalController {

    @Autowired
    private CrewmanPersonalService crewmanPersonalService;

    @PostMapping("/create")
    public ResponseEntity<CrewmanPersonal> createOrUpdateCrewman(@RequestBody CrewmanPersonal crewmanPersonal) {
        CrewmanPersonal savedCrewman = crewmanPersonalService.saveOrUpdateCrewman(crewmanPersonal);
        return ResponseEntity.ok(savedCrewman);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CrewmanPersonal> getCrewmanById(@PathVariable Long id) {
        return crewmanPersonalService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/list")
    public ResponseEntity<List<CrewmanPersonal>> listAllCrewmen() {
        List<CrewmanPersonal> crewmen = crewmanPersonalService.findAllCrewmen();
        return ResponseEntity.ok(crewmen);
    }
}
