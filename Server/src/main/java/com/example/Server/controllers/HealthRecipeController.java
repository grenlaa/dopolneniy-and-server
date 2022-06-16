package com.example.Server.controllers;


import com.example.Server.models.HealthRecipe;
import com.example.Server.repo.HealthRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class HealthRecipeController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private HealthRecipeRepository HealthRecipeRepository;

    @GetMapping("/HealthRecipe")
    public List<HealthRecipe> getHealthRecipe() {
        return (List<HealthRecipe>) this.HealthRecipeRepository.findAll();
    }

    @GetMapping("/DelHealthRecipe/{id}")
    public String DelHealthRecipe(@PathVariable(value="id") long id, Model model) {
        HealthRecipe HealthRecipe=HealthRecipeRepository.findById(id).orElseThrow();
        HealthRecipeRepository.delete(HealthRecipe);
        return ("delete SportMap"+id);
    }

    @PostMapping("/CreateHealthRecipe")
    public String CreateHealthRecipe(
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String ingredients,
            @RequestParam String recipe,
            @RequestParam String time,
            @RequestParam String portion,
            @RequestParam String nutrValue
    ) throws IOException {
        HealthRecipe HealthRecipe=new HealthRecipe(title,ingredients,recipe,time,portion,nutrValue);

        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
            HealthRecipe.setImage("assets/images/"+resultFileName);
        }
        HealthRecipeRepository.save(HealthRecipe);
        return ("create HealthRecipe/" + title);
    }


    @PostMapping("/EditHealthRecipe/{id}")
    public String EditHealthRecipe(
            @PathVariable(value="id") long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String ingredients,
            @RequestParam String recipe,
            @RequestParam String time,
            @RequestParam String portion,
            @RequestParam String nutrValue
    )throws IOException {
        HealthRecipe HealthRecipe=HealthRecipeRepository.findById(id).orElseThrow();
        HealthRecipe.setTitle(title);
        HealthRecipe.setIngredients(ingredients);
        HealthRecipe.setRecipe(recipe);
        HealthRecipe.setTime(time);
        HealthRecipe.setPortion(portion);
        HealthRecipe.setNutrValue(nutrValue);

        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
            HealthRecipe.setImage("assets/images/"+resultFileName);
        }
            HealthRecipeRepository.save(HealthRecipe);
        return("edit"+id);
    }
}
