package com.Crewing.BackEnd.Services;
import com.Crewing.BackEnd.DTO.OvertimeDTO;
import com.Crewing.BackEnd.Models.Overtime;
import java.util.List;

public interface OvertimeService {
    Overtime saveOvertime(OvertimeDTO overtimeDTO);
    Overtime getOvertimeById(Long id);
    List<Overtime> getAllOvertimes();
    void deleteOvertime(Long id);
    boolean deleteOvertimeByCrewMemberAndShift(Long crewMemberId, Long shiftId); // New method
    List<Overtime> getOvertimesByShiftId(Long shiftId);
    List<Overtime> getOvertimesByCrewMemberId(Long crewMemberId);
}
