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
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
             @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(teacherService.findStudentByRole(page , limit,search));
    }
    @GetMapping("/v1/teacher/student-check")
    public ResponseEntity<Object> findStudentCheckByRole(
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(teacherService.findStudentCheckByRole(page , limit,search));
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
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(teacherService.findCompanyByRole(page , limit,search));
    }
    @GetMapping("/v1/teacher/company-check")
    public ResponseEntity<Object> findCompanyCheckByRole(
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(teacherService.findCompanyCheckByRole(page , limit,search));
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
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String validType

    ) {
        return ResponseEntity.ok(teacherService.findVacanciesByTeacherValidType(page ,limit,search));
    }
    @GetMapping("/v1/teacher/vacancies-check")
    public ResponseEntity<Object> findVacanciesCheckByTeacherValidType(
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String search


    ) {
        return ResponseEntity.ok(teacherService.findVacanciesCheckByTeacherValidType(page ,limit,search));
    }
    @PutMapping("/v1/teacher/{teacherId}/vacancies-review/{vacanciesId}")
    public ResponseEntity<Object> UpdateVacanciesByTeacherValidType(
            @PathVariable String teacherId,
            @PathVariable String vacanciesId,
            @RequestBody TeacherValidTypeCategory teacherValidTypeCategory

    ) {
        return ResponseEntity.ok(teacherService.UpdateVacanciesByTeacherValidType(teacherId ,vacanciesId,teacherValidTypeCategory));
    }
    @GetMapping("/v1/teacher/apply-review")
    public ResponseEntity<Object> findApply(
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String  changeApplyType

            ) {
        return ResponseEntity.ok(teacherService.findApply(changeApplyType,page,limit));
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
