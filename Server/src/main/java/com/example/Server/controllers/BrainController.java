package com.example.Server.controllers;

import com.example.Server.models.Brain;
import com.example.Server.repo.BrainRepository;
import com.example.Server.repo.GroupsRepository;
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
public class BrainController {


    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private BrainRepository BrainRepository;

    @GetMapping("/Brain")
    public List<Brain> getBrain() {
        return (List<Brain>) this.BrainRepository.findAll();
    }

    @PostMapping("/CreateBrain")
    public String CreateBrain(
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String url
    ) throws IOException {
        Brain Brain=new Brain(title, url);

        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
            Brain.setImage("/assets/images/"+resultFileName);
        }

        BrainRepository.save(Brain);
        return "redirect:/";
    }

    @GetMapping("/DelBrain/{id}")
    public String DelBrain(@PathVariable(value="id") long id, Model model) {
        Brain Brain=BrainRepository.findById(id).orElseThrow();
        BrainRepository.delete(Brain);
        return ("delete Brain"+id);
    }


    @PostMapping("/EditBrain/{id}")
    public String EditBrain(
            @PathVariable(value="id") long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String url
    )throws IOException {
        Brain Brain=BrainRepository.findById(id).orElseThrow();
        Brain.setTitle(title);
        Brain.setUrl(url);

        if (image !=null && !image.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName = uuidFile + image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\" + resultFileName)));
            Brain.setImage("/assets/images/" + resultFileName);
        }
        BrainRepository.save(Brain);
        return("edit"+id);
    }

}