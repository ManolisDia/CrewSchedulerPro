package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.CrewMember;

import java.util.List;

public interface CrewMemberService {
    CrewMember saveCrewMember(CrewMember crewMember);
    CrewMember getCrewMemberById(Long id);
    CrewMember getCrewMemberByUsername(String username); // For authentication purposes
    List<CrewMember> getAllCrewMembers();
    void deleteCrewMember(Long id);
    CrewMember updateCrewMember(CrewMember crewMember); // Optional, to update crew member details
}
