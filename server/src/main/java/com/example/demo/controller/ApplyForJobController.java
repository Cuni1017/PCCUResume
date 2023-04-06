package com.example.demo.controller;

import com.example.demo.category.ApplyCategory;
import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.service.ApplyForJobService;
import com.example.demo.service.CompanyForJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ApplyForJobController {
    private  final ApplyForJobService applyForJobService;
    private final JavaMailSender mailSender;
    private  final CompanyForJobService companyForJobService;

    @GetMapping("/students/{studentName}/apply-for-job/vacancies/{vacanciesId}")
    public ResponseEntity<Object> findUserResume(
            @PathVariable String studentName,
            @PathVariable String vacanciesId
    ){
        return ResponseEntity.ok(applyForJobService.findUserResume(studentName,vacanciesId));
    }
    @PostMapping("/students/{userId}/{resumeId}/apply-for-job/{companyId}/{vacanciesId}")
    public ResponseEntity<Object> createApply(
            @PathVariable String userId,
            @PathVariable String companyId,
            @PathVariable String resumeId,
            @PathVariable String vacanciesId,
            @RequestBody ApplyCategory applyCategory
    ){
        return ResponseEntity.ok(applyForJobService.createApply(userId,companyId,resumeId,vacanciesId,applyCategory));
    }
    @PutMapping("/students/company-for-job/{applyId}")
    public ResponseEntity<Object> changeCompanyApplyType(
            @PathVariable String applyId,
            @RequestBody ChangeApplyTypeCategory changeApplyTypeCategory


    ){
        return ResponseEntity.ok( companyForJobService.changeApply(applyId,changeApplyTypeCategory));
    }

}
