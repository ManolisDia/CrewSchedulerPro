package com.CrewSchedulerPro.Back.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CrewSchedulerPro.Back.Repository.CrewmanLogInRepository;
import com.CrewSchedulerPro.Back.Model.CrewmanLogIn;

@Service
public class CrewmanLogInService {

    @Autowired
    private CrewmanLogInRepository crewmanLogInRepository;

    // Example method for authentication logic
    public boolean authenticate(String username, String password) {
        // This is a simplistic approach; actual implementation should use encrypted passwords
        // and possibly Spring Security for a robust authentication system.
        return crewmanLogInRepository.findByUsernameAndPassword(username, password).isPresent();
    }

    // Other methods related to login operations can be added here
}
