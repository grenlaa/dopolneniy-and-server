package com.example.Server.controllers;

import com.example.Server.models.Competition;
import com.example.Server.models.Competitor;
import com.example.Server.models.Groups;
import com.example.Server.repo.CompetitionRepository;
import com.example.Server.repo.CompetitorRepository;
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
public class CompetitorController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private CompetitorRepository CompetitorRepository;

    @Autowired
    private CompetitionRepository CompetitionRepository;

    @GetMapping("/GetCompetitor/{id}")
    public List<Competitor> GetCompetitor(
            @PathVariable(value="id") long id
    ){
        Competition Competition=CompetitionRepository.findById(id).orElseThrow();
        return Competition.getCompetitor();
    }

    @GetMapping("/DelCompetitor/{id}")
    public String DelCompetitor(@PathVariable(value="id") long id, Model model) {
        Competitor Competitor=CompetitorRepository.findById(id).orElseThrow();
        CompetitorRepository.delete(Competitor);
        return ("delete Group"+id);
    }

    @PostMapping("/CreateCompetitor")
    public String CreateCompetitor(
            @RequestParam String name,
            @RequestParam String title,
            @RequestParam("image") MultipartFile image,
            @RequestParam String date,
            @RequestParam String descr,
            @RequestParam Long idCmpn
    ) throws IOException {
        String resultFileName="";
        String image1="";
        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
        }
        image1=("assets/images/"+resultFileName);

        Competition Competition=CompetitionRepository.findById(idCmpn).orElseThrow();
        Competitor cmpr=new Competitor(name, title,image1,date,descr,Competition);
        CompetitorRepository.save(cmpr);
        return "good job";
    }

    @PostMapping("/EditCompetitor/{id}")
    public String EditCompetitor(
            @PathVariable(value="id") long id,
            @RequestParam String name,
            @RequestParam String title,
            @RequestParam("image") MultipartFile image,
            @RequestParam String date,
            @RequestParam String descr
    ) throws IOException {
        String resultFileName="";
        String image1="";
        Competitor Competitor= CompetitorRepository.findById(id).orElseThrow();
        Competitor.setName(name);
        Competitor.setTitle(title);
        Competitor.setDescr(descr);
        Competitor.setDate(date);
        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
            Competitor.setImage("assets/images/"+resultFileName);
        }
        CompetitorRepository.save(Competitor);
        return "good job";
    }
}
