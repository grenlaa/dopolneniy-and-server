package com.example.Server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class AddFile {

    @Value("${upload.path}")
    private String uploadPath;

    public String addFile(MultipartFile image) throws IOException {
        String resultFileName="";
        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));

        }
        return ("/assets/images/"+resultFileName);
    }


}
