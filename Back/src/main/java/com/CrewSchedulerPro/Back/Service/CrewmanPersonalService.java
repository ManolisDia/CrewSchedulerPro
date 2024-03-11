package com.CrewSchedulerPro.Back.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CrewSchedulerPro.Back.Repository.CrewmanPersonalRepository;
import com.CrewSchedulerPro.Back.Model.CrewmanPersonal;

import java.util.List;

@Service
public class CrewmanPersonalService {

    @Autowired
    private CrewmanPersonalRepository crewmanPersonalRepository;

    public CrewmanPersonal saveOrUpdateCrewman(CrewmanPersonal crewmanPersonal) {
        // Add any business logic prior to saving the crewman, if necessary
        return crewmanPersonalRepository.save(crewmanPersonal);
    }

    public List<CrewmanPersonal> findAllCrewmen() {
        return crewmanPersonalRepository.findAll();
    }

    public java.util.Optional<CrewmanPersonal> findById(Long id) {
        return crewmanPersonalRepository.findById(id);
    }

}
