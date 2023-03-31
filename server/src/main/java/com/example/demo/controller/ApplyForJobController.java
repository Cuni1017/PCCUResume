package com.example.demo.controller;

import com.example.demo.category.ApplyCategory;
import com.example.demo.service.ApplyForJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ApplyForJobController {
    private  final ApplyForJobService applyForJobService;
    private final JavaMailSender mailSender;
    @GetMapping("/students/{userId}/apply-for-job/{vacanciesId}")
    public ResponseEntity<Object> findUserResume(
            @PathVariable String userId,
            @PathVariable String vacanciesId
    ){
        return ResponseEntity.ok(applyForJobService.findUserResume(userId,vacanciesId));
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

}
