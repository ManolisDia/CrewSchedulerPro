package com.Crewing.BackEnd.Repositories;

import com.Crewing.BackEnd.Models.CrewMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CrewMemberRepository extends JpaRepository<CrewMember, Long> {
    Optional<CrewMember> findByUsername(String username);
}    
