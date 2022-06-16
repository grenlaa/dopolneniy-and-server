package com.example.Server.controllers;

import com.example.Server.models.Groups;
import com.example.Server.models.SportMap;
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
public class GroupsController {


    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private GroupsRepository GroupsRepository;

    @GetMapping("/Groups")
    public List<Groups> getGroups() {
        return (List<Groups>) this.GroupsRepository.findAll();
    }

    @PostMapping("/CreateGroup")
    public String CreateGroup(
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String url
    ) throws IOException {
        Groups Group=new Groups(title, url);

        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
            Group.setImage("assets/images/"+resultFileName);
        }

        GroupsRepository.save(Group);
        return "redirect:/";
    }

    @GetMapping("/DelGroup/{id}")
    public String DelGroup(@PathVariable(value="id") long id, Model model) {
        Groups Group=GroupsRepository.findById(id).orElseThrow();
        GroupsRepository.delete(Group);
        return ("delete Group"+id);
    }


    @PostMapping("/EditGroup/{id}")
    public String EditGroup(
            @PathVariable(value="id") long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String url
    )throws IOException {
        Groups Groups=GroupsRepository.findById(id).orElseThrow();
        Groups.setTitle(title);
        Groups.setUrl(url);

        if (image !=null && !image.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName = uuidFile + image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\" + resultFileName)));
            Groups.setImage("assets/images/" + resultFileName);
        }
        GroupsRepository.save(Groups);
        return("edit"+id);
    }

}
