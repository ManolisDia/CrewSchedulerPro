package com.CrewSchedulerPro.Back.Model;

import jakarta.persistence.*;

@Entity
@Table(name="ShiftAssignment")
public class ShiftAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="crewmanLoginId", referencedColumnName = "id")
    private CrewmanLogIn crewmanLogin;

    @ManyToOne
    @JoinColumn(name="shiftId", referencedColumnName = "id")
    private Shifts shift;

    public ShiftAssignment() {
    }

    public ShiftAssignment(CrewmanLogIn crewmanLogin, Shifts shift) {
        this.crewmanLogin = crewmanLogin;
        this.shift = shift;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CrewmanLogIn getCrewmanLogin() {
        return crewmanLogin;
    }

    public void setCrewmanLogin(CrewmanLogIn crewmanLogin) {
        this.crewmanLogin = crewmanLogin;
    }

    public Shifts getShift() {
        return shift;
    }

    public void setShift(Shifts shift) {
        this.shift = shift;
    }

    @Override
    public String toString() {
        return "ShiftAssignment{" +
                "id=" + id +
                ", crewmanLogin=" + crewmanLogin +
                ", shift=" + shift +
                '}';
    }
}

    
