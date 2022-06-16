package com.example.Server.controllers;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")
public class AdditionalController {
    public String str;

    @Value("${upload.path.ckeditor}")
    private String uploadPath;

    @PostMapping("/CreateImage")
    public String CreateImage(
            @RequestParam("file") MultipartFile image
    ) throws IOException {

        String resultFileName = null;
        if (image != null && !image.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            resultFileName= uuidFile + image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\imagesCkeditor\\" + resultFileName)));

        }
        return ("/assets/imagesCkeditor/"+resultFileName);
    }
}
