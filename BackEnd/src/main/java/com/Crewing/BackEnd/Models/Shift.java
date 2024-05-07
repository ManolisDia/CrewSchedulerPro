package com.Crewing.BackEnd.Models;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "shifts")
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String postcode;

    @Column(nullable = false)
    private String bookingCompany;

    @Column(nullable = false)
    private String siteContact;

    @Column(nullable = false)
    private String siteContactNumber;

    @Column(nullable = false)
    @JsonProperty("date")
    private String date;

    @Column(nullable = false)
    @JsonProperty("startTime")
    private String startTime;

    @Column(nullable = false)
    @JsonProperty("endTime")
    private String endTime;

    @Column(nullable = true)
    @JsonProperty("notes")
    private String notes;

    @Column(nullable = true)
    private Integer overtimeHours;  

    @Column(nullable = false)
    @JsonProperty("required_crew_members")
    private Integer requiredCrewMembers; 
    @ManyToMany
    @JoinTable(
        name = "shift_crew",
        joinColumns = @JoinColumn(name = "shift_id"),
        inverseJoinColumns = @JoinColumn(name = "crew_id")
    )
    private List<CrewMember> crewMembers;

    // Constructors
    public Shift() {
    }

    public Shift(String address, String postcode, Integer requiredCrewMembers, String bookingCompany, 
                String siteContact, String siteContactNumber, String date, String startTime, 
                String endTime, String notes, List<CrewMember> crewMembers, Integer overtimeHours) {
        this.address = address;
        this.postcode = postcode;
        this.bookingCompany = bookingCompany;
        this.siteContact = siteContact;
        this.siteContactNumber = siteContactNumber;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.notes = notes;
        this.requiredCrewMembers = requiredCrewMembers;
        this.crewMembers = crewMembers;
        this.overtimeHours = overtimeHours;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getBookingCompany() {
        return bookingCompany;
    }

    public void setBookingCompany(String bookingCompany) {
        this.bookingCompany = bookingCompany;
    }

    public String getSiteContact() {
        return siteContact;
    }

    public void setSiteContact(String siteContact) {
        this.siteContact = siteContact;
    }

    public String getSiteContactNumber() {
        return siteContactNumber;
    }

    public void setSiteContactNumber(String siteContactNumber) {
        this.siteContactNumber = siteContactNumber;
    }

    public List<CrewMember> getCrewMembers() {
        return crewMembers;
    }

    public void setCrewMembers(List<CrewMember> crewMembers) {
        this.crewMembers = crewMembers;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getOvertimeHours() {
        return overtimeHours;
    }

    public void setOvertimeHours(Integer overtimeHours) {
        this.overtimeHours = overtimeHours;
    }

    public Integer getRequiredCrewMembers() {
        return requiredCrewMembers;
    }

    public void setRequiredCrewMembers(Integer requiredCrewMembers) {
        this.requiredCrewMembers = requiredCrewMembers;
    }

    public Integer getAdditionalCrewNeeded() {
        int assignedCrew = crewMembers != null ? crewMembers.size() : 0;
        return requiredCrewMembers - assignedCrew;
    }
    


    


    @Override
    public String toString() {
        return "Shift{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", postcode='" + postcode + '\'' +
                ", bookingCompany='" + bookingCompany + '\'' +
                ", siteContact='" + siteContact + '\'' +
                ", siteContactNumber='" + siteContactNumber + '\'' +
                ", date=" + date +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", notes='" + notes + '\'' +
                ", overtimeHours=" + overtimeHours +
                ", requiredCrewMembers=" + requiredCrewMembers +
                ", crewMembers=" + crewMembers +
                '}';
    }
}