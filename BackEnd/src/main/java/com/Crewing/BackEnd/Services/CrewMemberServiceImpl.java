package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Repositories.CrewMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CrewMemberServiceImpl implements CrewMemberService {

    @Autowired
    private CrewMemberRepository crewMemberRepository;

    @Override
    public CrewMember saveCrewMember(CrewMember crewMember) {
        return crewMemberRepository.save(crewMember);
    }

    @Override
    public CrewMember getCrewMemberById(Long id) {
        return crewMemberRepository.findById(id).orElse(null);
    }

    @Override
    public CrewMember getCrewMemberByUsername(String username) {
        return crewMemberRepository.findByUsername(username).orElse(null);
    }

    @Override
    public List<CrewMember> getAllCrewMembers() {
        return crewMemberRepository.findAll();
    }

    @Override
    public void deleteCrewMember(Long id) {
        crewMemberRepository.deleteById(id);
    }

    @Override
    public CrewMember updateCrewMember(CrewMember crewMember) {
        return crewMemberRepository.save(crewMember);
    }
}
