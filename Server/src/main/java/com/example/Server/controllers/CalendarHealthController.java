package com.example.Server.controllers;

import com.example.Server.models.CalendarHealth;
import com.example.Server.models.Groups;
import com.example.Server.repo.CalendarHealthRepository;
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

public class CalendarHealthController {

        @Value("${upload.path}")
        private String uploadPath;

        @Autowired
        private CalendarHealthRepository CalendarHealthRepository;

        @GetMapping("/CalendarHealth")
        public List<CalendarHealth> getCalendarH() {
            return (List<CalendarHealth>) this.CalendarHealthRepository.findAll();
        }
        @GetMapping("/DelCalendarH/{id}")
        public String deleteCalendarH(@PathVariable(value="id") long id, Model model) {
                CalendarHealth CalendarHealth=CalendarHealthRepository.findById(id).orElseThrow();
                CalendarHealthRepository.delete(CalendarHealth);
                return ("delete Calendar"+id);
        }
        @PostMapping("/CreateCalendarH")
        public String CreateCalendarH(
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

        @PostMapping("/EditCalendarH/{id}")
        public String EditCalendarH(
                @PathVariable(value="id") long id,
                @RequestParam("image") MultipartFile image,
                @RequestParam String title,
                @RequestParam String descr,
                @RequestParam String date_dayh

        )throws IOException {
                CalendarHealth CH=CalendarHealthRepository.findById(id).orElseThrow();
                CH.setTitle(title);
                CH.setDescr(descr);
                CH.setDateDayH(date_dayh);
                if (image !=null && !image.getOriginalFilename().isEmpty()) {
                        File uploadDir = new File(uploadPath);
                        if (!uploadDir.exists()) {
                                uploadDir.mkdir();
                        }
                        String uuidFile = UUID.randomUUID().toString();
                        String resultFileName = uuidFile + image.getOriginalFilename();
                        image.transferTo((new File("C:\\study\\Diplom\\Client\\public\\assets\\images\\" + resultFileName)));
                        CH.setImage("assets/images/" + resultFileName);
                }
                CalendarHealthRepository.save(CH);
                return("edit"+id);
        }

}
