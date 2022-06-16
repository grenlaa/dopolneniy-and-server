package com.example.Server.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CalendarHealth {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title, image, dateDayH,descr;

    public CalendarHealth() {
    }

    public CalendarHealth(String title, String dateDayH, String descr) {
        this.title = title;
        this.dateDayH = dateDayH;
        this.descr = descr;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDateDayH() {
        return dateDayH;
    }

    public void setDateDayH(String dateDayH) {
        this.dateDayH = dateDayH;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
















