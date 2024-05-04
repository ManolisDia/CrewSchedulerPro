package com.Crewing.BackEnd.Models;

public class LoginResponse {
    private String message;
    private CrewMember user;  // Added this field to include user details

    public LoginResponse(String message, CrewMember user) {
        this.message = message;
        this.user = user;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CrewMember getUser() {
        return user;
    }

    public void setUser(CrewMember user) {
        this.user = user;
    }
}
