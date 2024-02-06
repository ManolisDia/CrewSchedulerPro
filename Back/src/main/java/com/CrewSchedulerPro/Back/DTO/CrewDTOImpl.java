package com.CrewSchedulerPro.Back.DTO;

import com.CrewSchedulerPro.Back.Model.CrewEntity;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

public class CrewDTOImpl implements CrewDTO{

    private EntityManager entityManager;

    public CrewDTOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    @Override
    public void save(CrewEntity crew) {
        entityManager.persist(crew);
        
        
    }
    
}
