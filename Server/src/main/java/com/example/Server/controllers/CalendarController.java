package com.example.Server.controllers;

import com.example.Server.models.Brain;
import com.example.Server.models.Calendar;
import com.example.Server.repo.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api")
public class CalendarController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private CalendarRepository CalendarRepository;

    @GetMapping("/Calendar")
    public List<Calendar> getCalendar() {
        return (List<Calendar>) this.CalendarRepository.findAll();
    }

    @GetMapping("/DelCalendar/{id}")
    public String DelCalendar(@PathVariable(value="id") long id, Model model) {
        Calendar Calendar=CalendarRepository.findById(id).orElseThrow();
        CalendarRepository.delete(Calendar);
        return ("delete Calendar"+id);
    }

    @PostMapping("/CreateCalendar")
    public String CreateCalendar(
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String startD,
            @RequestParam String endD,
            @RequestParam String colorD,
            @RequestParam Boolean timeDisplay
    ) throws IOException {
        Calendar Calendar=new Calendar(title,startD,endD,colorD,timeDisplay,descr);
        CalendarRepository.save(Calendar);
        return "кк";
    }
    @PostMapping("/EditCalendar/{id}")
    public String EditCalendar(
            @PathVariable(value="id") long id,
            @RequestParam String title,
            @RequestParam String descr,
            @RequestParam String startD,
            @RequestParam String endD,
            @RequestParam String colorD,
            @RequestParam Boolean timeDisplay
    ) throws IOException {
        Calendar Calendar=CalendarRepository.findById(id).orElseThrow();
        Calendar.setTitle(title);
        Calendar.setDescription(descr);
        Calendar.setStart(startD);
        Calendar.setEnd(endD);
        Calendar.setColor(colorD);
        Calendar.setTimeDisplay(timeDisplay);
        CalendarRepository.save(Calendar);
        return("edit"+id);
    }
}
