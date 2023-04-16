package com.example.demo.controller;

import com.example.demo.category.TeacherValidTypeCategory;
import com.example.demo.model.TeacherValidType;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;
    @GetMapping("/v1/teacher/{teacherId}/news")
    public ResponseEntity<Object> findNewsById(
            @PathVariable String teacherId
    ) {
        return ResponseEntity.ok(teacherService.findNewsById(teacherId));
    }
    @GetMapping("/v1/teacher/{teacherId}/student-review/{studentId}")
    public ResponseEntity<Object> updateStudentReview(
            @PathVariable String teacherId,
            @PathVariable String studentId,
            @RequestBody TeacherValidTypeCategory teacherValidTypeCategory
            ) {
        return ResponseEntity.ok(teacherService.updateStudentReview(teacherId,studentId,teacherValidTypeCategory));
    }

}
