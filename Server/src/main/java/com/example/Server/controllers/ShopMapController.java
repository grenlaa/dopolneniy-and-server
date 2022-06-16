package com.example.Server.controllers;


import com.example.Server.models.ShopMap;
import com.example.Server.models.SportMap;
import com.example.Server.repo.ShopMapRepository;
import com.example.Server.repo.SportMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")

public class ShopMapController {

    @Autowired
    private ShopMapRepository ShopMapRepository;

    @GetMapping("/ShopMap")
    public List<ShopMap> getShopMap() {
        return (List<ShopMap>) this.ShopMapRepository.findAll();
    }

    @GetMapping("/DelShopMap/{id}")
    public String DelShopMap(@PathVariable(value="id") long id, Model model) {
        ShopMap ShopMap=ShopMapRepository.findById(id).orElseThrow();
        ShopMapRepository.delete(ShopMap);
        return ("delete SportMap"+id);
    }

    @PostMapping("/CreateShopMap")
    public String CreateShopMap(
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String number,
            @RequestParam String site,
            @RequestParam String url,
            @RequestParam double x,
            @RequestParam double y
    ) throws IOException {

        ShopMap SM=new ShopMap(title,descr,number,site,url,x,y);
        ShopMapRepository.save(SM);
        return (title+descr+number+site+url+x+y);
    }


    @PostMapping("/EditShopMap/{id}")
    public String EditShopMap(
            @PathVariable(value="id") long id,
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String number,
            @RequestParam String site,
            @RequestParam String url,
            @RequestParam double x,
            @RequestParam double y
    )throws IOException {
        ShopMap ShopMap=ShopMapRepository.findById(id).orElseThrow();
        ShopMap.setTitle(title);
        ShopMap.setDescr(descr);
        ShopMap.setNumber(number);
        ShopMap.setSite(site);
        ShopMap.setUrl(url);
        ShopMap.setX(x);
        ShopMap.setY(y);
        ShopMapRepository.save(ShopMap);
        return("edit"+id);
    }
}