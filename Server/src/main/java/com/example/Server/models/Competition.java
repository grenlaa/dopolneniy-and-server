package com.example.Server.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title,image;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "competition")
    private List<Competitor> Competitor;

    public Competition() {
    }

    public Competition(String title, String image) {
        this.title = title;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Competitor> getCompetitor() {
        return Competitor;
    }

    public void setCompetitor(List<Competitor> Competitor) {
        this.Competitor = Competitor;
    }
}
