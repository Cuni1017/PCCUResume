package com.example.demo.controller;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.category.VacanciesWatchTypeCategory;
import com.example.demo.model.VacanciesWatchType;
import com.example.demo.service.CompanyService;
import jakarta.servlet.http.HttpServletResponse;
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
    @GetMapping("/v1/company/{companyName}/user-like")
    public ResponseEntity<Object> findUserLike(
            @PathVariable String companyName
    ){
        return ResponseEntity.ok(companyService.findUserLike(companyName));
    }
    @PostMapping("/v1/company/{companyName}/user-like/{vacanciesId}")
    public ResponseEntity<Object> createUserLike(
            @PathVariable String companyName,
            @PathVariable String vacanciesId
    ){
        return ResponseEntity.ok(companyService.createUserLike(companyName,vacanciesId));
    }

    @DeleteMapping("/v1/company/{companyName}/user-like/{userLikeId}")
    public ResponseEntity<Object> deleteUserLike(
            @PathVariable String companyName,
            @PathVariable String userLikeId
    ){
        return ResponseEntity.ok(companyService.deleteUserLike(companyName,userLikeId));
    }

    @GetMapping("/v1/company/{companyName}/teacher-file")
    public ResponseEntity<Object> findVacancies(
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String fileType
    ) {
        return ResponseEntity.ok(companyService.findTeacherFileForm(fileType,page,limit));
    }
    @GetMapping("/v1/company/{companyName}/teacher-file/{teacherFileId}")
    public ResponseEntity<Object> downloadTeacherFile(
            @PathVariable String companyName,
            @PathVariable String teacherFileId,
            HttpServletResponse response
    ) {
        return companyService.downloadTeacherFile(companyName,teacherFileId,response);
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
    @PutMapping("/company/vacancies/{vacanciesId}/vacancies-watch-type")
    public ResponseEntity<Object> updateVacanciesWatchType(
            @PathVariable String vacanciesId,
            @RequestBody VacanciesWatchTypeCategory vacanciesWatchTypeCategory
    ) {

        return ResponseEntity.ok(companyService.updateVacanciesWatchType(vacanciesId,vacanciesWatchTypeCategory));
    }
    @DeleteMapping("/company/{companyName}/vacancies/{vacanciesId}")
    public ResponseEntity<Object> deleteVacancies(
            @PathVariable String companyName,
            @PathVariable String vacanciesId
    ) {
        return ResponseEntity.ok(companyService.deleteVacancies(companyName,vacanciesId));
    }
}
