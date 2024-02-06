
package com.CrewSchedulerPro.Back.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class CrewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="CrewID")
    private Long CrewID;

    @Column(name="username", nullable=false, unique=true)
    private String username;

    @Column(name="email", nullable=false, unique=true)
    private String email;

    @Column(name="password", nullable=false)
    private String password;

    public CrewEntity() {
        // Default constructor
    }

    public CrewEntity(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getCrewID() {
        return CrewID;
    }

    public void setCrewID(Long CrewID) {
        this.CrewID = CrewID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
    @Override
    public String toString() {
        return "CrewEntity{" +
                "CrewID=" + CrewID +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

    

