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
    @GetMapping("/company/{companyName}")
    public ResponseEntity<Object> findCompanyByCompanyName(
            @PathVariable String companyName
    ) {
        return ResponseEntity.ok(companyService.findCompanyByCompanyName(companyName));
    }
    @GetMapping("/company/{companyName}/vacancies")
    public ResponseEntity<Object> findVacancies(
            @PathVariable String companyName,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(companyService.findVacanciesByCompanyName(companyName,page,limit));
    }
    //C
    @GetMapping("/company/{companyName}/company-about")
    public ResponseEntity<Object> findcompanyAboutByCompanyName(
            @PathVariable String companyName

    ) {
        return ResponseEntity.ok(companyService.findcompanyAboutByCompanyName(companyName));
    }
//    @PostMapping("/company/{companyName}/company-about")
//    public ResponseEntity<Object> CreateCompanyAbout(
//
//
//    ) {
//        return ResponseEntity.ok(companyService.CreateCompanyAbout(companyName));
//    }

    @PostMapping("/company/{companyName}/vacancies")
    public ResponseEntity<Object> createVacancies(
            @PathVariable String companyName,
            @RequestBody VacanciesCategory vacanciesCategory
    ) {
        return ResponseEntity.ok(companyService.createVacancies(companyName,vacanciesCategory));
    }
    @PutMapping("/company/{companyName}/vacancies/{vacanciesId}")
    public ResponseEntity<Object> updateVacancies(
            @PathVariable String companyName,
            @PathVariable String vacanciesId,
            @RequestBody VacanciesCategory vacanciesCategory
    ) {
        return ResponseEntity.ok(companyService.updateVacancies(companyName,vacanciesId,vacanciesCategory));
    }
    @DeleteMapping("/company/{companyName}/vacancies/{vacanciesId}")
    public ResponseEntity<Object> deleteVacancies(
            @PathVariable String companyName,
            @PathVariable String vacanciesId
    ) {
        return ResponseEntity.ok(companyService.deleteVacancies(companyName,vacanciesId));
    }
}
