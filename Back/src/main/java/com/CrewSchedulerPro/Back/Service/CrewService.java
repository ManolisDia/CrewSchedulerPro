package com.CrewSchedulerPro.Back.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CrewSchedulerPro.Back.Model.CrewEntity;
import com.CrewSchedulerPro.Back.Repository.CrewRepository;

@Service
public class CrewService {
    
    @Autowired
    private CrewRepository crewRepository;

    public CrewEntity createCrew(CrewEntity crew) {
        return crewRepository.save(crew);
    }

    public CrewEntity findByUsername(String username) {
        return crewRepository.findByUsername(username).orElse(null);
    }

}
