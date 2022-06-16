package com.example.Server.controllers;


import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")
public class AuthController {

    private String PaswordHash="$2a$04$/./VjwR3mpaUKy0QuWn3feea.yJvij5kBnSGD6Bz7LpvR1qH4YeP2";

    @GetMapping("/GAuth")
    public String GAuth(){
        return PaswordHash;
    }

}
