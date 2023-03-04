package com.example.demo.controller;


import com.example.demo.dto.resume.post.*;
import com.example.demo.model.resume.RLicense;
import com.example.demo.service.ResumeService;

import jdk.jshell.Snippet;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ResumeController {
    private final ResumeService resumeService;
    @GetMapping("/students/{studentId}/resume/{resumeId}")
    public ResponseEntity<Object> findAllResumeById(
            @PathVariable String studentId,
            @PathVariable String resumeId

    ) {
        if(resumeService.findAllResumeByIdAndResumeId(studentId,resumeId) == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }else{
            return ResponseEntity.ok(resumeService.findAllResumeByIdAndResumeId(studentId,resumeId));
        }

    }
    @PostMapping("/students/{studentId}/resume")
    public ResponseEntity<Object> chooseResume(
            @RequestBody ResumeRequest request,
            @PathVariable String studentId
    ) {

        return ResponseEntity.ok(resumeService.createBasicResume(request,studentId));
    }
    @PostMapping("/students/{studentId}/resume")
    public ResponseEntity<Object> writeBasicResume(
            @PathVariable String studentId
    ) {

        return ResponseEntity.ok(resumeService.chooseResume(studentId));
    }
    @PutMapping("/students/{studentId}/resume/{resumeId}/work-hope/{workHopeId}")
    public ResponseEntity<Object> editWorkHope(
            @RequestBody RWorkHopeRequest request,
            @PathVariable String studentId,
            @PathVariable String workHopeId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.editWorkHope(request,studentId,resumeId,workHopeId));
    }
    @DeleteMapping("/students/{studentId}/resume/{resumeId}/work-hope/{workHopeId}")
    public ResponseEntity<Object> deleteWorkHope(
            @RequestBody RWorkHopeRequest request,
            @PathVariable String studentId,
            @PathVariable String workHopeId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.deleteWorkHope(request,studentId,resumeId,workHopeId));
    }
    @PostMapping("/students/{studentId}/resume/{resumeId}/special-skill")
    public ResponseEntity<Object> writeSpecialSkill(
            @RequestBody RSpecialSkillRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createSpecialSkill(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resume/{resumeId}/special-skill/{specialSkillId}")
    public ResponseEntity<Object> editSpecialSkill(
            @RequestBody RSpecialSkillRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String specialSkillId
    ) {
        return ResponseEntity.ok(resumeService.editSpecialSkill(request,studentId,resumeId,specialSkillId));
    }
    @DeleteMapping("/students/{studentId}/resume/{resumeId}/special-skill/{specialSkillId}")
    public ResponseEntity<Object> deleteSpecialSkill(
            @RequestBody RSpecialSkillRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String specialSkillId
    ) {
        return ResponseEntity.ok(resumeService.deleteSpecialSkill(request,studentId,resumeId,specialSkillId));
    }
    @PostMapping("/students/{studentId}/resume/{resumeId}/license")
    public ResponseEntity<Object> writeLicense(
            @RequestBody RlicenseRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createLicense(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resume/{resumeId}/license/{licenseId}")
    public ResponseEntity<Object> editLicense(
            @RequestBody RlicenseRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String licenseId
    ) {
        return ResponseEntity.ok(resumeService.editLicense(request,studentId,resumeId,licenseId));
    }
    @DeleteMapping("/students/{studentId}/resume/{resumeId}/license/{licenseId}")
    public ResponseEntity<Object> deleteLicense(
            @RequestBody RlicenseRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String licenseId
    ) {
        return ResponseEntity.ok(resumeService.deleteLicense(request,studentId,resumeId,licenseId));
    }
    @PostMapping("/students/{studentId}/resume/{resumeId}/project-achievments")
    public ResponseEntity<Object> writeProjectAchievments(
            @RequestBody RProjectAchievementsRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createProjectAchievments(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resume/{resumeId}/project-achievments/{projectAchievmentsId}")
    public ResponseEntity<Object> editProjectAchievments(
            @RequestBody RProjectAchievementsRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String projectAchievmentsId
    ) {
        return ResponseEntity.ok(resumeService.editProjectAchievments(request,studentId,resumeId,projectAchievmentsId));
    }
    @DeleteMapping("/students/{studentId}/resume/{resumeId}/project-achievments/{projectAchievmentsId}")
    public ResponseEntity<Object> deleteProjectAchievments(
            @RequestBody RProjectAchievementsRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String projectAchievmentsId
    ) {
        return ResponseEntity.ok(resumeService.deleteProjectAchievments(request,studentId,resumeId,projectAchievmentsId));
    }
    @PostMapping("/students/{studentId}/resume/{resumeId}/autobiography")
    public ResponseEntity<Object> writeAutobiography(
            @RequestBody RAutobiographyRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createAutobiography(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resume/{resumeId}/autobiography/{autobiographyId}")
    public ResponseEntity<Object> editAutobiography(
            @RequestBody RAutobiographyRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String autobiographyId
    ) {
        return ResponseEntity.ok(resumeService.editAutobiography(request,studentId,resumeId,autobiographyId));
    }
    @DeleteMapping("/students/{studentId}/resume/{resumeId}/autobiography/{autobiographyId}")
    public ResponseEntity<Object> deleteAutobiography(
            @RequestBody RAutobiographyRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String autobiographyId
    ) {
        return ResponseEntity.ok(resumeService.deleteAutobiography(request,studentId,resumeId,autobiographyId));
    }
    @PostMapping("/students/{studentId}/resume/{resumeId}/work-experience")
    public ResponseEntity<Object> writeWorkExperience(
            @RequestBody RWorkExperienceRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createWorkExperience(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resume/{resumeId}/work-experience/{workExperienceId}")
    public ResponseEntity<Object> editWorkExperience(
            @RequestBody RWorkExperienceRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String workExperienceId
    ) {
        return ResponseEntity.ok(resumeService.editWorkExperience(request,studentId,resumeId,workExperienceId));
    }
    @DeleteMapping("/students/{studentId}/resume/{resumeId}/work-experience/{workExperienceId}")
    public ResponseEntity<Object> deleteWorkExperience(
            @RequestBody RWorkExperienceRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String workExperienceId
    ) {
        return ResponseEntity.ok(resumeService.deleteWorkExperience(request,studentId,resumeId,workExperienceId));
    }


}
