package com.example.demo.controller;

import com.example.demo.service.VacanciesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VacanciesController {
    private final VacanciesService VacanciesService;
    @GetMapping("/vacancies")
    public ResponseEntity<Object> findPageVacancies(
           @RequestParam(required = false) List<String> technology,
           @RequestParam(required = false) List<String> county ,
           @RequestParam(required = false) String salaryType,
           @RequestParam(defaultValue = "100000000000",required = false) Long salaryMax ,
           @RequestParam(defaultValue = "1" ,required = false) int salaryMin,
           @RequestParam(defaultValue = "vacancies_id",required = false ) String order,
           @RequestParam(defaultValue = "1" ,required = false  ) int page,
           @RequestParam(defaultValue = "10",required = false ) int limit
           ) {
            return ResponseEntity.ok(VacanciesService.findPageVacancies(county,technology,salaryType,salaryMax,salaryMin,order,page,limit));
    }
    @GetMapping("/vacancies/{vacanciesId}")
    public ResponseEntity<Object> findVacanciesById(
            @PathVariable String vacanciesId
    ) {
        return ResponseEntity.ok(VacanciesService.findFullVacanciesById(vacanciesId));
    }
    @GetMapping("/vacancies/skills")
    public ResponseEntity<Object> findSkills(
    ) {
        return ResponseEntity.ok(VacanciesService.findSkills());
    }
    @GetMapping("/vacancies/counties")
    public ResponseEntity<Object> findCounties(
    ) {
        return ResponseEntity.ok(VacanciesService.findCounties());
    }
}
