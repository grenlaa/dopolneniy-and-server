package com.example.Server.controllers;

import com.example.Server.models.CalendarHealth;
import com.example.Server.models.SportMap;
import com.example.Server.repo.CalendarHealthRepository;
import com.example.Server.repo.SportMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@Controller
public class CreateController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private CalendarHealthRepository CalendarHealthRepository;


    @PostMapping("/CalendarH")
    public String CalendarCreate(
            @RequestParam("image") MultipartFile image,
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String date_dayh
    ) throws IOException {
        CalendarHealth CH=new CalendarHealth(title,date_dayh,descr);
        if (image !=null && !image.getOriginalFilename().isEmpty()){
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName=uuidFile+image.getOriginalFilename();
            image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\"+resultFileName)));
            CH.setImage("assets/images/"+resultFileName);
        }

        CalendarHealthRepository.save(CH);
        return "redirect:/";
    }




//
//    @PostMapping("/SportMap")
//    public String SportMapCreate(
//            @RequestParam String title,
//            @RequestParam String descr,
//            @RequestParam String number,
//            @RequestParam String site,
//            @RequestParam String url,
//            @RequestParam double x,
//            @RequestParam double y
//    ) throws IOException {
//        SportMap SM=new SportMap( title,descr,number,site,url,x,y);
//        SportMapRepository.save(SM);
//        return "redirect:/";
//    }

//    @PostMapping("/CalendarHT")
//    @ResponseBody
//    public String CalendarCreateT(
//            @RequestBody Map<String, String> map
////             @RequestParam(name="title1",required = false,defaultValue = "11") String title1,
////            @RequestParam(name="file",required = false,defaultValue = "11") String file,
////            @RequestParam(name="descr",required = false,defaultValue = "11") String descr,
////            @RequestParam(name="date_dayh",required = false,defaultValue = "11") String date_dayh
//    )throws IOException {
//        String title1 = map.get("title1");
//        String image = map.get("image");
//        String descr = map.get("descr");
//        String date_dayh = map.get("date_dayh");
//
//
//        String uuidFile = UUID.randomUUID().toString();
//
//        File original=new File(image);
//        File copied = new File(
//                "src/asd.txt");
//        FileUtils.copyFile(original, copied);
//
//
////        File[] listOfFiles=source.listFiles();
////
//////        Files.copy(source.toPath(), dest.toPath());
////
////        Path destDir = Paths.get("C:\\study\\Diplom\\ClientAdm\\public\\assets\\images\\");
////
////            for (File file : listOfFiles)
////                Files.copy(file.toPath(), destDir.resolve(file.getName()), StandardCopyOption.REPLACE_EXISTING);
//
//        return("asd");
//    }

}
