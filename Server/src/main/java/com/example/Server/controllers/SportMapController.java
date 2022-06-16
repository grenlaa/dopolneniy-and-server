package com.example.Server.controllers;

import com.example.Server.models.SportMap;
import com.example.Server.repo.SportMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")
public class SportMapController {

        @Autowired
        private SportMapRepository SportMapRepository;

        @GetMapping("/SportMap")
        public List<SportMap> getSportMap() {
            return (List<SportMap>) this.SportMapRepository.findAll();
        }

        @GetMapping("/DelSportMap/{id}")
        public String DelSportMap(@PathVariable(value="id") long id, Model model) {
                SportMap SportMap=SportMapRepository.findById(id).orElseThrow();
                SportMapRepository.delete(SportMap);
                return ("delete SportMap"+id);
        }

        @PostMapping("/CreateSportMap")
        public String CreateSportMap(
                @RequestParam String title,
                @RequestParam String descr,
                @RequestParam String number,
                @RequestParam String site,
                @RequestParam String url,
                @RequestParam double x,
                @RequestParam double y
        ) throws IOException {

                SportMap SM=new SportMap( title,descr,number,site,url,x,y);
                SportMapRepository.save(SM);
                return (title+descr+number+site+url+x+y);
        }


        @PostMapping("/EditSportMap/{id}")
        public String EditSportMap(
                @PathVariable(value="id") long id,
                @RequestParam String title,
                @RequestParam String descr,
                @RequestParam String number,
                @RequestParam String site,
                @RequestParam String url,
                @RequestParam double x,
                @RequestParam double y
        )throws IOException {
                SportMap SportMap=SportMapRepository.findById(id).orElseThrow();
                SportMap.setTitle(title);
                SportMap.setDescr(descr);
                SportMap.setNumber(number);
                SportMap.setSite(site);
                SportMap.setUrl(url);
                SportMap.setX(x);
                SportMap.setY(y);
                SportMapRepository.save(SportMap);
                return("edit"+id);
        }
}
