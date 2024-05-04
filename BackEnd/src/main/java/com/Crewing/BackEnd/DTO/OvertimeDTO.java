package com.Crewing.BackEnd.DTO;

public class OvertimeDTO {

    private Long shiftId;
    private Long crewMemberId;
    private Integer overtimeHours;

    // Default constructor
    public OvertimeDTO() {
    }

    // Constructor with fields
    public OvertimeDTO(Long shiftId, Long crewMemberId, Integer overtimeHours) {
        this.shiftId = shiftId;
        this.crewMemberId = crewMemberId;
        this.overtimeHours = overtimeHours;
    }

    // Getters and setters
    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public Long getCrewMemberId() {
        return crewMemberId;
    }

    public void setCrewMemberId(Long crewMemberId) {
        this.crewMemberId = crewMemberId;
    }

    public Integer getOvertimeHours() {
        return overtimeHours;
    }

    public void setOvertimeHours(Integer overtimeHours) {
        this.overtimeHours = overtimeHours;
    }
}
