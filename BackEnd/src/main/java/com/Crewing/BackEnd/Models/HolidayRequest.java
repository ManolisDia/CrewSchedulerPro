package com.Crewing.BackEnd.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "holiday_requests")
public class HolidayRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crew_member_id", nullable = false)
    private CrewMember crewMember;

    @Column(nullable = false)
    private String date;  // The date the crew member wants off

    // Constructors, getters, and setters
    public HolidayRequest() {
    }

    public HolidayRequest(CrewMember crewMember, String date) {
        this.crewMember = crewMember;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CrewMember getCrewMember() {
        return crewMember;
    }

    public void setCrewMember(CrewMember crewMember) {
        this.crewMember = crewMember;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
