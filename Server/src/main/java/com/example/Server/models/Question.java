package com.example.Server.models;


import javax.persistence.*;
import java.util.List;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String text,image,idTest;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "question")
    private List<Answer> ans;

//    public List<Answer> getAns() {
//        return ans;
//    }

    public Question(String text, String idTest, List<Answer> ans) {
        this.text = text;
        this.idTest = idTest;
        this.ans = ans;
    }

    public void setAns(List<Answer> ans) {
        this.ans = ans;
    }

    public Question() {
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getIdTest() {
        return idTest;
    }

    public void setIdTest(String idTest) {
        this.idTest = idTest;
    }
}
