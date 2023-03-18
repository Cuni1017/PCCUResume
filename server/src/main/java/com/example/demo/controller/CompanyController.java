package com.example.demo.controller;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;
    @GetMapping("/Company/{companyId}/vacancies")
    public ResponseEntity<Object> getVacancies(
            @PathVariable String companyId
    ) {
        return ResponseEntity.ok(companyService.getVacanciesSkillAndCounty(companyId));
    }
    @PostMapping("/Company/{companyId}/vacancies")
    public ResponseEntity<Object> createVacancies(
            @PathVariable String companyId,
            @RequestBody VacanciesCategory vacanciesCategory
    ) {
        return ResponseEntity.ok(companyService.createVacancies(companyId,vacanciesCategory));
    }
}
