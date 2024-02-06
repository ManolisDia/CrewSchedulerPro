package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CrewSchedulerPro.Back.Model.CrewEntity;
import com.CrewSchedulerPro.Back.Service.CrewService;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/crew")
public class CrewController {
    @Autowired
    private CrewService crewService;

    @PostMapping("/register")
    public ResponseEntity<String> registerCrew(@RequestBody CrewEntity user) {
        // Validate input, handle registration logic, etc.
        crewService.createCrew(user);
        return ResponseEntity.ok("User registered successfully");
    }
}

