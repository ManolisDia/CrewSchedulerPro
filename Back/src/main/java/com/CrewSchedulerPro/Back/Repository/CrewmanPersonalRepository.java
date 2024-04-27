package com.CrewSchedulerPro.Back.Repository;

import com.CrewSchedulerPro.Back.Model.CrewmanPersonal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewmanPersonalRepository extends JpaRepository<CrewmanPersonal, Long> {
    // You can add custom query methods here if needed
}