package com.CrewSchedulerPro.Back.Model;

import jakarta.persistence.*;

@Entity
@Table(name="CrewmanPersonal")
public class CrewmanPersonal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="employmentStatus")
    private String employmentStatus;

    @Column(name="jobPosition")
    private String jobPosition;

    @Column(name="requestedWorkHours")
    private Integer requestedWorkHours;

    public CrewmanPersonal() {
    }

    public CrewmanPersonal(String name, String employmentStatus, String jobPosition, Integer requestedWorkHours) {
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

    // toString method
    @Override
    public String toString() {
        return "CrewmanPersonal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", employmentStatus='" + employmentStatus + '\'' +
                ", jobPosition='" + jobPosition + '\'' +
                ", requestedWorkHours=" + requestedWorkHours +
                '}';
    }
}
