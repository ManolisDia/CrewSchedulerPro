package com.CrewSchedulerPro.Back.Model;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name="Shifts")
public class Shifts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="location")
    private String location;

    @Column(name="date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name="startTime")
    @Temporal(TemporalType.TIME)
    private Date startTime;

    @Column(name="endTime")
    @Temporal(TemporalType.TIME)
    private Date endTime;

    @Column(name="notes")
    private String notes;

    
    public Shifts() {
    }

    public Shifts(String location, Date date, Date startTime, Date endTime, String notes) {
        this.location = location;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Shifts{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", date=" + date +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", notes='" + notes + '\'' +
                '}';
    }
}
