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
    @GetMapping("/company/{companyId}/vacancies")
    public ResponseEntity<Object> getVacancies(
            @PathVariable String companyId
    ) {
        return ResponseEntity.ok(companyService.getVacancies(companyId));
    }
    @PostMapping("/company/{companyId}/vacancies")
    public ResponseEntity<Object> createVacancies(
            @PathVariable String companyId,
            @RequestBody VacanciesCategory vacanciesCategory
    ) {
        return ResponseEntity.ok(companyService.createVacancies(companyId,vacanciesCategory));
    }
}
