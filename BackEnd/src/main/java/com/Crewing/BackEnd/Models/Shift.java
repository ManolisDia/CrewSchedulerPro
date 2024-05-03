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

    @JsonProperty("notes")
    private String notes;

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

    public Shift(String address, String postcode, String bookingCompany, String siteContact,
                 String siteContactNumber, String date, String startTime, String endTime,
                 String notes, List<CrewMember> crewMembers) {
        this.address = address;
        this.postcode = postcode;
        this.bookingCompany = bookingCompany;
        this.siteContact = siteContact;
        this.siteContactNumber = siteContactNumber;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.notes = notes;
        this.crewMembers = crewMembers;
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
                ", crewMembers=" + crewMembers +
                '}';
    }
}