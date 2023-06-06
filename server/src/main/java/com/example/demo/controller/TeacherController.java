package com.example.demo.controller;

import com.example.demo.category.*;
import com.example.demo.category.resume.post.SearchCategory;
import com.example.demo.model.TeacherFile;
import com.example.demo.model.TeacherValidType;
import com.example.demo.service.TeacherService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @GetMapping("/v1/teacher/{teacherId}/user-like")
    public ResponseEntity<Object> findUserLike(
            @PathVariable String teacherId
    ){
        return ResponseEntity.ok(teacherService.findUserLike(teacherId));
    }
    @PostMapping("/v1/teacher/{teacherId}/user-like/{vacanciesId}")
    public ResponseEntity<Object> createUserLike(
            @PathVariable String teacherId,
            @PathVariable String vacanciesId
    ){
        return ResponseEntity.ok(teacherService.createUserLike(teacherId,vacanciesId));
    }
    @DeleteMapping("/v1/students/{teacherId}/user-like/{vacanciesId}")
    public ResponseEntity<Object> deleteUserLike(
            @PathVariable String teacherId,
            @PathVariable String vacanciesId
    ){
        return ResponseEntity.ok(teacherService.deleteUserLike(teacherId,vacanciesId));
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
            @RequestParam(required = false) String search

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
    @PutMapping("/v1/teacher/{teacherId}/apply-review/{applyId}/update-apply-time")
    public ResponseEntity<Object> updateApplyTime(
            @PathVariable String applyId,
            @RequestBody ApplyTimeCategory applyTimeCategory

    ) {
        return ResponseEntity.ok(teacherService.updateApplyTime(applyId,applyTimeCategory));
    }

    @GetMapping("/v1/teacher/teacher-file-form")
    public ResponseEntity<Object> findTeacherFileForm(
            @RequestParam(required = false,defaultValue = "1" ) int page,
            @RequestParam(required = false,defaultValue = "10" ) int limit,
            @RequestParam(required = false) String fileType
    ) {
        return ResponseEntity.ok(teacherService.findTeacherFileForm(fileType,page,limit));
    }
    @PostMapping("/v1/teacher/{teacherId}/teacher-file-form")
    public ResponseEntity<Object> createTeacherFileForm(
            @RequestBody TeacherFileCategory teacherFileCategory,
            @PathVariable String teacherId
            ) {
        return ResponseEntity.ok(teacherService.createTeacherFileForm(teacherFileCategory,teacherId));
    }
    @PutMapping("/v1/teacher/{teacherId}/teacher-file-form/{teacherFileId}")
    public ResponseEntity<Object> updateTeacherFileForm(
            @RequestBody TeacherFileCategory teacherFileCategory,
            @PathVariable String teacherId,
            @PathVariable String teacherFileId
    ) {
        return ResponseEntity.ok(teacherService.updateTeacherFileForm(teacherFileCategory,teacherId,teacherFileId));
    }
    @DeleteMapping("/v1/teacher/{teacherId}/teacher-file-form/{teacherFileId}")
    public ResponseEntity<Object> deleteTeacherFileForm(
            @PathVariable String teacherId,
            @PathVariable String teacherFileId
    ) {
        return ResponseEntity.ok(teacherService.deleteTeacherFileForm(teacherId,teacherFileId));
    }

    @GetMapping("/v1/teacher/{teacherId}/teacher-file/{teacherFileId}")
    public ResponseEntity<Object> downloadTeacherFile(
            @PathVariable String teacherId,
            @PathVariable String teacherFileId,
            HttpServletResponse response
    ) {
        return teacherService.downloadTeacherFile(teacherId,teacherFileId,response);
    }
    @PostMapping("/v1/teacher/{teacherId}/teacher-file")
    public ResponseEntity<Object> uploadTeacherFile(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String teacherId,
            HttpServletRequest HttpServletRequest
    ) {
        return ResponseEntity.ok(teacherService.uploadTeacherFile(uploadFile,teacherId,HttpServletRequest));
    }

    @PutMapping("/v1/teacher/{teacherId}/teacher-file/{teacherFileId}")
    public ResponseEntity<Object> uploadUpdateTeacherFile(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String teacherId,
            @PathVariable String teacherFileId,
            HttpServletRequest HttpServletRequest
    ) {
        return ResponseEntity.ok(teacherService.uploadUpdateTeacherFile(uploadFile,teacherId,teacherFileId,HttpServletRequest));
    }
    @DeleteMapping("/v1/teacher/{teacherId}/teacher-file/{teacherFileId}")
    public ResponseEntity<Object> deleteTeacherFile(
            @PathVariable String teacherId,
            @PathVariable String teacherFileId

    ) {
        return ResponseEntity.ok(teacherService.deleteTeacherFile(teacherId,teacherFileId));
    }
    @GetMapping("/v1/teacher/{teacherId}/data-count")
    public ResponseEntity<Object> findDataCount(
            @PathVariable String teacherId,
            @PathVariable String teacherFileId,
            HttpServletResponse response
    ) {
        return teacherService.downloadTeacherFile(teacherId,teacherFileId,response);
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
