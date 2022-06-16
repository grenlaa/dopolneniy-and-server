package com.example.Server.controllers;

import com.example.Server.models.HospitalMap;
import com.example.Server.models.SportMap;
import com.example.Server.repo.HospitalMapRepository;
import com.example.Server.repo.SportMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")
public class HospitalMapController {

    @Autowired
    private HospitalMapRepository HospitalMapR;

    @GetMapping("/HospitalMap")
    public List<HospitalMap> GetHospitalMap() {
        return (List<HospitalMap>) this.HospitalMapR.findAll();
    }

    @GetMapping("/DelHospitalMap/{id}")
    public String DelHospitalMap(@PathVariable(value="id") long id, Model model) {
        HospitalMap HospitalMap=HospitalMapR.findById(id).orElseThrow();
        HospitalMapR.delete(HospitalMap);
        return ("delete SportMap"+id);
    }

    @PostMapping("/CreateHospitalMap")
    public String CreateHospitalMap(
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String number,
            @RequestParam String site,
            @RequestParam String url,
            @RequestParam double x,
            @RequestParam double y
    ) throws IOException {

        HospitalMap SM=new HospitalMap( title,descr,number,site,url,x,y);
        HospitalMapR.save(SM);
        return (title+descr+number+site+url+x+y);
    }


    @PostMapping("/EditHospitalMap/{id}")
    public String EditHospitalMap(
            @PathVariable(value="id") long id,
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String number,
            @RequestParam String site,
            @RequestParam String url,
            @RequestParam double x,
            @RequestParam double y
    )throws IOException {
        HospitalMap HospitalMap=HospitalMapR.findById(id).orElseThrow();
        HospitalMap.setTitle(title);
        HospitalMap.setDescr(descr);
        HospitalMap.setNumber(number);
        HospitalMap.setSite(site);
        HospitalMap.setUrl(url);
        HospitalMap.setX(x);
        HospitalMap.setY(y);
        HospitalMapR.save(HospitalMap);
        return("edit"+id);
    }
}
