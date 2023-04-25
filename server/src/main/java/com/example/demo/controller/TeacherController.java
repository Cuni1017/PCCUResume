package com.example.demo.controller;

import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.category.RoleCategory;
import com.example.demo.category.TeacherValidTypeCategory;
import com.example.demo.category.resume.post.SearchCategory;
import com.example.demo.model.TeacherValidType;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;
    @GetMapping("/v1/teacher/{teacherId}")
    public ResponseEntity<Object> findTeacher(
            @PathVariable String teacherId
    ) {
        return ResponseEntity.ok(teacherService.findById(teacherId));
    }

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
    @GetMapping("/v1/teacher/student-check")
    public ResponseEntity<Object> findStudentCheckByRole(
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
    @DeleteMapping("/v1/teacher/{teacherId}/student-review/{studentId}")
    public ResponseEntity<Object> deleteStudentRole(
            @PathVariable String teacherId,
            @PathVariable String studentId
    ) {
        return ResponseEntity.ok(teacherService.deleteStudentRole(teacherId,studentId));
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
    @DeleteMapping("/v1/teacher/{teacherId}/company-review/{companyId}")
    public ResponseEntity<Object> deleteCompanyByRole(
            @PathVariable String teacherId,
            @PathVariable String companyId
    ) {
        return ResponseEntity.ok(teacherService.deleteCompanyByRole(teacherId,companyId));
    }
    @GetMapping("/v1/teacher/vacancies-review")
    public ResponseEntity<Object> findVacanciesByTeacherValidType(
            @RequestParam int page,
            @RequestParam int limit,
            @RequestBody SearchCategory searchCategory

    ) {
        return ResponseEntity.ok(teacherService.findVacanciesByTeacherValidType(page ,limit,searchCategory));
    }
    @PutMapping("/v1/teacher/{teacherId}/vacancies-review/{vacanciesId}")
    public ResponseEntity<Object> UpdateVacanciesByTeacherValidType(
            @PathVariable String teacherId,
            @PathVariable String vacanciesId,
            @RequestBody TeacherValidTypeCategory teacherValidTypeCategory

    ) {
        return ResponseEntity.ok(teacherService.UpdateVacanciesByTeacherValidType(teacherId ,vacanciesId,teacherValidTypeCategory));
    }
    @GetMapping("/v1/teacher/{teacherId}/apply-review")
    public ResponseEntity<Object> findApply(
            @PathVariable String teacherId,
            @RequestParam int page,
            @RequestParam int limit,
            @RequestBody(required = false) ChangeApplyTypeCategory changeApplyTypeCategory

            ) {
        return ResponseEntity.ok(teacherService.findApply(teacherId,changeApplyTypeCategory,page,limit));
    }
    @PutMapping("/v1/teacher/{teacherId}/apply-review/{applyId}")
    public ResponseEntity<Object> updateApply(
            @PathVariable String teacherId,
            @PathVariable String applyId,
            @RequestBody ChangeApplyTypeCategory changeApplyTypeCategory

    ) {
        return ResponseEntity.ok(teacherService.updateApply(teacherId,applyId,changeApplyTypeCategory));
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
