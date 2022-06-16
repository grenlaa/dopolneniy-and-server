package com.example.Server.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class HealthRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title,image,ingredients,recipe,time,portion,nutrValue;

    public HealthRecipe() {
    }

    public HealthRecipe(String title, String ingredients, String recipe, String time, String portion, String nutrValue) {
        this.title = title;
        this.ingredients = ingredients;
        this.recipe = recipe;
        this.time = time;
        this.portion = portion;
        this.nutrValue = nutrValue;
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

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPortion() {
        return portion;
    }

    public void setPortion(String portion) {
        this.portion = portion;
    }

    public String getNutrValue() {
        return nutrValue;
    }

    public void setNutrValue(String nutrValue) {
        this.nutrValue = nutrValue;
    }
}
