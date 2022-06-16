package com.example.Server.controllers;

import com.example.Server.models.*;
import com.example.Server.repo.*;
import com.example.Server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;


//@CrossOrigin(origins = "https://health35.site/")
//@CrossOrigin(origins = "http://127.0.0.1:8000/")
@RestController
@RequestMapping("api")
public class TestsController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private AnswerRepository AnswerRepository;
    @Autowired
    private QuestionRepository QuestionRepository;

    @Autowired
    private CompetitorRepository CompetitorRepository;

    @Autowired
    private CompetitionRepository CompetitionRepository;

    private AddFile AddFile;

    @GetMapping("/ans")
    public List<Answer> getAns() {
        return (List<Answer>) this.AnswerRepository.findAll();
    }
    @GetMapping("/que")
    public List<Question> getQu() {
        return (List<Question>) this.QuestionRepository.findAll();
    }

    @GetMapping("/GetCompetition")
    public List<Competition> GetCompetition(){
        return (List<Competition>) CompetitionRepository.findAll();
    }



    private String PaswordHash="$2a$04$/./VjwR3mpaUKy0QuWn3feea.yJvij5kBnSGD6Bz7LpvR1qH4YeP2";
    private String Password1="XjWN36kLMN";

    @PostMapping("/Auth")
    public String Auth(
            @RequestParam String PHash){
        if(PHash.compareTo(Password1)==0) {
            return PaswordHash+"   "+PHash;
        }else{
            return PaswordHash+"   "+PHash;
        }
    }

    @PostMapping("/AuthPas")
    public boolean AuthPas(
            @RequestParam String PHash){
        if(PHash.compareTo(Password1)==0) {
            return true;
        }else{
            return false;
        }
    }


            @PostMapping("/CreateCompetition")
    public String CreateCompetition(
            @RequestParam String title,
            @RequestParam("image") MultipartFile image
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
        Competition cmpn=new Competition(title,image1);
        CompetitionRepository.save(cmpn);
        return "";
    }

    @GetMapping("/DelCompetition/{id}")
    public String DelCompetition(@PathVariable(value="id") long id, Model model) {
        Competition Competition=CompetitionRepository.findById(id).orElseThrow();
        CompetitionRepository.delete(Competition);
        return ("delete Group"+id);
    }

            @PostMapping("/CreateTest")
    public String CreateTest(
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String number,
            @RequestParam String site,
            @RequestParam String url,
            @RequestParam double x,
            @RequestParam double y)
            throws IOException {

        return "asd";
    }

    @PostMapping("/PostImage")
    public String PostImage(
            @RequestParam("image") MultipartFile image
    )throws IOException {
        return "asd";
    }

}
