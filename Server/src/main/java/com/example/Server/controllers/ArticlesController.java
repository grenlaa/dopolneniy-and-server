package com.example.Server.controllers;

import com.example.Server.models.Articles;
import com.example.Server.models.Brain;
import com.example.Server.repo.ArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")
public class ArticlesController {

    @Autowired
    private ArticlesRepository ArticlesRepository;


    @GetMapping("/GetArticles")
    public List<Articles> GetArticles() {
        return (List<Articles>) this.ArticlesRepository.findAll();
    }

    @PostMapping("/CreateArticles")
    public String CreateArticles(
            @RequestParam String title,
            @RequestParam String descr
    ) throws IOException {
        Articles Articles=new Articles(title, descr);
        ArticlesRepository.save(Articles);
        return "redirect:/";
    }

    @GetMapping("/DelArticles/{id}")
    public String DelArticles(@PathVariable(value="id") long id, Model model) {
        Articles Articles=ArticlesRepository.findById(id).orElseThrow();
        ArticlesRepository.delete(Articles);
        return ("delete Brain"+id);
    }


    @PostMapping("/EditArticles/{id}")
    public String EditArticles(
            @PathVariable(value="id") long id,
            @RequestParam String title,
            @RequestParam String descr
    )throws IOException {
        Articles Articles=ArticlesRepository.findById(id).orElseThrow();
        Articles.setTitle(title);
        Articles.setDescr(descr);
        ArticlesRepository.save(Articles);
        return("edit"+id);
    }

}
