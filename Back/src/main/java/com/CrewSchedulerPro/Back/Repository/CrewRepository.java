package com.CrewSchedulerPro.Back.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.CrewSchedulerPro.Back.Model.CrewEntity;

public interface CrewRepository extends JpaRepository<CrewEntity, Long>{

    Optional<CrewEntity> findByUsername(String username);
    
}
