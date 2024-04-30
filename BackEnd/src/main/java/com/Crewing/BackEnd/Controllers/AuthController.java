package com.Crewing.BackEnd.Controllers;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Models.LoginRequest;
import com.Crewing.BackEnd.Models.LoginResponse;
import com.Crewing.BackEnd.Services.CrewMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CrewMemberService crewMemberService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        CrewMember crewMember = crewMemberService.getCrewMemberByUsername(username);

        if (crewMember != null && crewMember.getPassword().equals(password)) {
            return ResponseEntity.ok(new LoginResponse("Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}