package com.example.Server.models;

import javax.persistence.*;

@Entity
public class Competitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name,title,image,date;

    @Lob
    private String descr;

    @ManyToOne
    @JoinColumn(name = "competition_id")
    private Competition competition;

    public Competitor() {
    }

    public Competitor(String name, String title, String image, String date, String descr, Competition competition) {
        this.name = name;
        this.title = title;
        this.image = image;
        this.date = date;
        this.descr = descr;
        this.competition=competition;
    }

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }
}
