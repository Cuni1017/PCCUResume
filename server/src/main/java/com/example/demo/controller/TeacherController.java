package com.example.demo.controller;

import com.example.demo.category.TeacherValidTypeCategory;
import com.example.demo.model.TeacherValidType;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Object> findStudentByRole(
            @PathVariable String teacherId,
            @PathVariable String studentId
    ) {
        return ResponseEntity.ok(teacherService.findStudentByRole(teacherId,studentId));
    }
    @PutMapping("/v1/teacher/{teacherId}/student-review/{studentId}")
    public ResponseEntity<Object> updateRole(
            @PathVariable String teacherId,
            @PathVariable String studentId,
            @RequestBody TeacherValidTypeCategory teacherValidTypeCategory
            ) {
        return ResponseEntity.ok(teacherService.updateRole(teacherId,studentId,teacherValidTypeCategory));
    }
//    @PutMapping("/v1/teacher/{teacherId}/company-review/{studentId}")
//    public ResponseEntity<Object> updateStudentReview(
//            @PathVariable String teacherId,
//            @PathVariable String studentId,
//            @RequestBody TeacherValidTypeCategory teacherValidTypeCategory
//    ) {
//        return ResponseEntity.ok(teacherService.updateStudentReview(teacherId,studentId,teacherValidTypeCategory));
//    }


}
