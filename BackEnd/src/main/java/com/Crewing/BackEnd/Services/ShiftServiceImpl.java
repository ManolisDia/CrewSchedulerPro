package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Repositories.ShiftRepository;
import com.Crewing.BackEnd.Repositories.CrewMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShiftServiceImpl implements ShiftService {

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private CrewMemberRepository crewMemberRepository; // Ensure you have a CrewMember repository

    @Override
    public Shift saveShift(Shift shift) {
        System.out.println("Saving shift: " + shift);
        return shiftRepository.save(shift);
    }

    @Override
    public Shift getShiftById(Long id) {
        return shiftRepository.findById(id).orElse(null);
    }

    @Override
    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
    }

    @Override
    public List<Shift> findShiftsByCrewMemberId(Long crewMemberId) {
        return shiftRepository.findByCrewMembers_Id(crewMemberId);
    }

    @Override
    public List<Shift> getShiftsByDate(String date) {
        return shiftRepository.findByDate(date);
    }

    @Override
    public void deleteShift(Long id) {
        shiftRepository.deleteById(id);
    }

    @Override
    public List<Shift> findShiftsWithIncompleteCrew() {
        return shiftRepository.findShiftsWithIncompleteCrew();
    }

    @Override
    public Shift addCrewMemberToShift(Long shiftId, Long crewMemberId) {
        Shift shift = getShiftById(shiftId);
        CrewMember crewMember = crewMemberRepository.findById(crewMemberId)
            .orElseThrow(() -> new RuntimeException("Crew member not found"));

        if (!shift.getCrewMembers().contains(crewMember)) {
            shift.getCrewMembers().add(crewMember);
            return saveShift(shift);  // Save the updated shift
        }
        throw new RuntimeException("Crew member already assigned to this shift");
    }
}
