package com.CrewSchedulerPro.Back.Service.impl;

import com.CrewSchedulerPro.Back.Model.CrewmanPersonal;
import com.CrewSchedulerPro.Back.Repository.CrewmanPersonalRepository;
import com.CrewSchedulerPro.Back.Service.CrewmanPersonalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrewmanPersonalServiceImpl implements CrewmanPersonalService {

    @Autowired
    private CrewmanPersonalRepository crewmanPersonalRepository;

    @Override
    public CrewmanPersonal saveOrUpdateCrewman(CrewmanPersonal crewmanPersonal) {
        return crewmanPersonalRepository.save(crewmanPersonal);
    }

    @Override
    public Optional<CrewmanPersonal> findById(Long id) {
        return crewmanPersonalRepository.findById(id);
    }

    @Override
    public List<CrewmanPersonal> findAllCrewmen() {
        return crewmanPersonalRepository.findAll();
    }

    @Override
    public void deleteCrewman(Long id) {
        crewmanPersonalRepository.deleteById(id);
    }
}