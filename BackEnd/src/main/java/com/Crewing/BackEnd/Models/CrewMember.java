package com.Crewing.BackEnd.Models;
import jakarta.persistence.*;

@Entity
@Table(name = "crew_members")
public class CrewMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String employmentStatus;

    @Column(nullable = false)
    private String jobPosition;

    @Column(nullable = false)
    private Integer requestedWorkHours;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // Simple authority model, can be expanded to multiple roles if needed
    @Column
    private String role;
    // Constructors
    public CrewMember() {
    }

    public CrewMember(String name, String employmentStatus, String jobPosition, Integer requestedWorkHours) {
        this.name = name;
        this.employmentStatus = employmentStatus;
        this.jobPosition = jobPosition;
        this.requestedWorkHours = requestedWorkHours;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getJobPosition() {
        return jobPosition;
    }

    public void setJobPosition(String jobPosition) {
        this.jobPosition = jobPosition;
    }

    public Integer getRequestedWorkHours() {
        return requestedWorkHours;
    }

    public void setRequestedWorkHours(Integer requestedWorkHours) {
        this.requestedWorkHours = requestedWorkHours;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // toString
    @Override
    public String toString() {
        return "CrewMember{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", employmentStatus='" + employmentStatus + '\'' +
                ", jobPosition='" + jobPosition + '\'' +
                ", requestedWorkHours=" + requestedWorkHours +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}