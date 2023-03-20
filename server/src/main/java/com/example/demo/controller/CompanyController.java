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
    @GetMapping("/company/{companyName}/vacancies")
    public ResponseEntity<Object> getVacancies(
            @PathVariable String companyName,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(companyService.findVacanciesByCompanyName(companyName,page,limit));
    }
    @PostMapping("/company/{companyId}/vacancies")
    public ResponseEntity<Object> createVacancies(
            @PathVariable String companyId,
            @RequestBody VacanciesCategory vacanciesCategory
    ) {
        return ResponseEntity.ok(companyService.createVacancies(companyId,vacanciesCategory));
    }
}
