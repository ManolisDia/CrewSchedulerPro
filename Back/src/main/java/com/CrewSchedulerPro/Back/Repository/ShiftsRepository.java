package com.CrewSchedulerPro.Back.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CrewSchedulerPro.Back.Model.Shifts;

import java.util.Date;
import java.util.List;

public interface ShiftsRepository extends JpaRepository<Shifts, Long> {
    List<Shifts> findByDate(Date date);
}
