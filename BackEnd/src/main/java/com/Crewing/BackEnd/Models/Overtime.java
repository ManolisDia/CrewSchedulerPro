package com.Crewing.BackEnd.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "overtime_requests")
public class Overtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shift_id", nullable = false)
    private Shift shift;

    @ManyToOne
    @JoinColumn(name = "crew_member_id", nullable = false)
    private CrewMember crewMember;

    @Column(nullable = true)
    private Integer overtimeHours; // The amount of overtime hours requested

    // Constructors, getters, and setters
    public Overtime() {
    }

    public Overtime(Shift shift, CrewMember crewMember, Integer overtimeHours) {
        this.shift = shift;
        this.crewMember = crewMember;
        this.overtimeHours = overtimeHours;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Shift getShift() {
        return shift;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }

    public CrewMember getCrewMember() {
        return crewMember;
    }

    public void setCrewMember(CrewMember crewMember) {
        this.crewMember = crewMember;
    }

    public Integer getOvertimeHours() {
        return overtimeHours;
    }

    public void setOvertimeHours(Integer overtimeHours) {
        this.overtimeHours = overtimeHours;
    }
}
