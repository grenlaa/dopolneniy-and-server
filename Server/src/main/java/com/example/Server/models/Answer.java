package com.example.Server.models;

import javax.persistence.*;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text,ans,idQuest;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

//    public Question getQuestion() {
//        return question;
//    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Answer(String text, String ans, String idQuest) {
        this.text = text;
        this.ans = ans;
        this.idQuest = idQuest;
    }

    public Answer() {
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

    public String getAns() {
        return ans;
    }

    public void setAns(String ans) {
        this.ans = ans;
    }

    public String getIdQuest() {
        return idQuest;
    }

    public void setIdQuest(String idQuest) {
        this.idQuest = idQuest;
    }
}
