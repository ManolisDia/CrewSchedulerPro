package com.CrewSchedulerPro.Back.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CrewSchedulerPro.Back.Model.CrewmanLogIn;
import com.CrewSchedulerPro.Back.Service.CrewmanLogInService;

@RestController
@RequestMapping("/api/auth")
public class CrewmanLogInController {

    @Autowired
    private CrewmanLogInService crewmanLogInService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody CrewmanLogIn loginDetails) {
        // Authentication logic handled in service
        boolean isAuthenticated = crewmanLogInService.authenticate(loginDetails.getUsername(), loginDetails.getPassword());
        if(isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    // Optionally, a logout method could be here if you're managing sessions or tokens manually.
}
