package com.CrewSchedulerPro.Back.Service;

import com.CrewSchedulerPro.Back.Model.CrewmanPersonal;

import java.util.List;
import java.util.Optional;

public interface CrewmanPersonalService {
    CrewmanPersonal saveOrUpdateCrewman(CrewmanPersonal crewmanPersonal);
    Optional<CrewmanPersonal> findById(Long id);
    List<CrewmanPersonal> findAllCrewmen();
    void deleteCrewman(Long id);
}