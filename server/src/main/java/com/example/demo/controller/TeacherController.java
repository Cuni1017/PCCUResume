package com.example.demo.controller;

import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;
    @GetMapping("/teacher/V1/news")
    public ResponseEntity<Object> findNewsById(
            @PathVariable String teacherId
    ) {
        return ResponseEntity.ok(teacherService.findNewsById());
    }
    public ResponseEntity<Object> findStudentReview(

    ) {
        return ResponseEntity.ok(teacherService.findStudentReview());
    }

}
