package com.example.demo.controller;

import com.example.demo.category.RoleCategory;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;
    @GetMapping("/v1/teacher/news")
    public ResponseEntity<Object> findNewsById(

    ) {
        return ResponseEntity.ok(teacherService.findNewsById());
    }
    @GetMapping("/v1/teacher/student-review")
    public ResponseEntity<Object> findStudentByRole(
            @RequestParam int page,
            @RequestParam int limit
    ) {
        return ResponseEntity.ok(teacherService.findStudentByRole(page , limit));
    }

    //回來要改不是teachervalidtpe 是role
    @PutMapping("/v1/teacher/{teacherId}/student-review/{studentId}")
    public ResponseEntity<Object> updateStudentRole(
            @PathVariable String teacherId,
            @PathVariable String studentId,
            @RequestBody RoleCategory roleCategory
            ) {
        return ResponseEntity.ok(teacherService.updateStudentRole(teacherId,studentId,roleCategory));
    }
    @GetMapping("/v1/teacher/company-review")
    public ResponseEntity<Object> findCompanyByRole(
            @RequestParam int page,
            @RequestParam int limit
    ) {
        return ResponseEntity.ok(teacherService.findCompanyByRole(page , limit));
    }
    @PutMapping("/v1/teacher/{teacherId}/company-review/{companyId}")
    public ResponseEntity<Object> updateCompanyByRole(
            @PathVariable String teacherId,
            @PathVariable String companyId,
            @RequestBody RoleCategory roleCategory
    ) {
        return ResponseEntity.ok(teacherService.updateCompanyByRole(teacherId,companyId,roleCategory));
    }
    @GetMapping("/v1/teacher/vacancies-review")
    public ResponseEntity<Object> findVacanciesByTeacherValidType(
            @RequestParam int page,
            @RequestParam int limit

    ) {
        return ResponseEntity.ok(teacherService.findVacanciesByTeacherValidType(page ,limit));
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
