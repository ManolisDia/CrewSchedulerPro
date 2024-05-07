package com.Crewing.BackEnd.Services;

import com.Crewing.BackEnd.DTO.OvertimeDTO;
import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Models.Overtime;
import com.Crewing.BackEnd.Models.Shift;
import com.Crewing.BackEnd.Repositories.CrewMemberRepository;
import com.Crewing.BackEnd.Repositories.OvertimeRepository;
import com.Crewing.BackEnd.Repositories.ShiftRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;

import java.util.List;

@Service
public class OvertimeServiceImpl implements OvertimeService {

    private static final Logger logger = LoggerFactory.getLogger(OvertimeServiceImpl.class);

    @Autowired
    private OvertimeRepository overtimeRepository;
    @Autowired
    private CrewMemberRepository crewMemberRepository;
    @Autowired
    private ShiftRepository shiftRepository; // Injecting the CrewMemberRepository

    @Override
    public Overtime saveOvertime(OvertimeDTO overtimeDTO) {
        CrewMember crewMember = crewMemberRepository.findById(overtimeDTO.getCrewMemberId())
            .orElseThrow(() -> new RuntimeException("Crew member not found"));
        Shift shift = shiftRepository.findById(overtimeDTO.getShiftId())
            .orElseThrow(() -> new RuntimeException("Shift not found"));

        Overtime overtime = new Overtime();
        overtime.setCrewMember(crewMember);
        overtime.setShift(shift);
        overtime.setOvertimeHours(overtimeDTO.getOvertimeHours());
        
        return overtimeRepository.save(overtime);
    }

    @Override
    public Overtime getOvertimeById(Long id) {
        return overtimeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Overtime> getAllOvertimes() {
        return overtimeRepository.findAll();
    }

    @Override
    public void deleteOvertime(Long id) {
        overtimeRepository.deleteById(id);
    }

    @Override
    public List<Overtime> getOvertimesByShiftId(Long shiftId) {
        return overtimeRepository.findByShift_Id(shiftId);
    }

    @Override
    public List<Overtime> getOvertimesByCrewMemberId(Long crewMemberId) {
        return overtimeRepository.findByCrewMember_Id(crewMemberId);
    }

    @Override
    public boolean deleteOvertimeByCrewMemberAndShift(Long crewMemberId, Long shiftId) {
        Optional<Overtime> overtime = overtimeRepository.findByCrewMember_IdAndShift_Id(crewMemberId, shiftId);
        if (overtime.isPresent()) {
            overtimeRepository.delete(overtime.get());
            logger.info("Deleted overtime for crew member ID {} on shift ID {}", crewMemberId, shiftId);
            return true;
        } else {
            logger.warn("Overtime not found for crew member ID {} on shift ID {}", crewMemberId, shiftId);
            return false;
        }
    }
}
