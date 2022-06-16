package com.example.Server.models;


import javax.persistence.*;

@Entity
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title,start,end,color;
    private Boolean timeDisplay;
    @Lob
    private String description;

    public Calendar() {
    }

    public Calendar(String title, String start, String end, String color, Boolean timeDisplay, String description) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.color = color;
        this.timeDisplay = timeDisplay;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getTimeDisplay() {
        return timeDisplay;
    }

    public void setTimeDisplay(Boolean timeDisplay) {
        this.timeDisplay = timeDisplay;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
