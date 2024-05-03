package com.Crewing.BackEnd.Repositories;


import com.Crewing.BackEnd.Models.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findByDate(String date);
    // You can add more custom query methods here if needed
}