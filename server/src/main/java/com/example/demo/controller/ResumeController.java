package com.example.demo.controller;



import com.example.demo.category.RSkillCategory;
import com.example.demo.category.resume.post.*;

import com.example.demo.service.ResumeService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor

public class ResumeController {
    private final ResumeService resumeService;

    @GetMapping("/students/{studentId}/resumes/{resumeId}")
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
    @GetMapping("/v1/resumes/{resumeId}")
    public ResponseEntity<Object> findByResumeId(
            @PathVariable String resumeId
    ) {
            return ResponseEntity.ok(resumeService.findByResumeId(resumeId));

    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}")
    public ResponseEntity<Object> deleteAllResumeById(
            @PathVariable String studentId,
            @PathVariable String resumeId

    ) {
        return ResponseEntity.ok(resumeService.deleteAllResumeById(studentId,resumeId));

    }
    @GetMapping("/students/{studentId}/resumes")
    public ResponseEntity<Object> chooseResume(
            @PathVariable String studentId
    ) {

        return ResponseEntity.ok(resumeService.chooseResume(studentId));
    }
    @PostMapping("/students/{studentId}/resumes")
    public ResponseEntity<Object> chooseResume(
            @RequestBody ResumeRequest request,
            @PathVariable String studentId
    ) {

        return ResponseEntity.ok(resumeService.createBasicResume(request,studentId));
    }

    @PostMapping("/students/{studentId}/resumes/{resumeId}/work-hope")
    public ResponseEntity<Object> createWorkHope(
            @RequestBody RWorkHopeRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createWorkHope(request,studentId,resumeId));
    }

    @PutMapping("/students/{studentId}/resumes/{resumeId}/work-hope/{workHopeId}")
    public ResponseEntity<Object> editWorkHope(
            @RequestBody RWorkHopeRequest request,
            @PathVariable String studentId,
            @PathVariable String workHopeId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.editWorkHope(request,studentId,resumeId,workHopeId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/work-hope/{workHopeId}")
    public ResponseEntity<Object> deleteWorkHope(

            @PathVariable String studentId,
            @PathVariable String workHopeId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.deleteWorkHope(studentId,resumeId,workHopeId));
    }

    @PostMapping("/students/{studentId}/resumes/{resumeId}/special-skill")
    public ResponseEntity<Object> writeSpecialSkill(
            @RequestBody RSpecialSkillRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createSpecialSkill(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resumes/{resumeId}/special-skill/{specialSkillId}")
    public ResponseEntity<Object> editSpecialSkill(
            @RequestBody RSpecialSkillRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String specialSkillId
    ) {
        return ResponseEntity.ok(resumeService.editSpecialSkill(request,studentId,resumeId,specialSkillId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/special-skill/{specialSkillId}")
    public ResponseEntity<Object> deleteSpecialSkill(

            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String specialSkillId
    ) {
        return ResponseEntity.ok(resumeService.deleteSpecialSkill(studentId,resumeId,specialSkillId));
    }
    @PostMapping("/students/{studentId}/resumes/{resumeId}/license")
    public ResponseEntity<Object> writeLicense(
            @RequestBody RlicenseRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createLicense(request,studentId,resumeId));
    }
        @PutMapping("/students/{studentId}/resumes/{resumeId}/license/{licenseId}")
    public ResponseEntity<Object> editLicense(
            @RequestBody RlicenseRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String licenseId
    ) {
        return ResponseEntity.ok(resumeService.editLicense(request,studentId,resumeId,licenseId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/license/{licenseId}")
    public ResponseEntity<Object> deleteLicense(

            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String licenseId
    ) {
        return ResponseEntity.ok(resumeService.deleteLicense(studentId,resumeId,licenseId));
    }
    @PostMapping("/students/{studentId}/resumes/{resumeId}/project-achievments")
    public ResponseEntity<Object> writeProjectAchievments(
            @RequestBody RProjectAchievementsRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createProjectAchievments(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resumes/{resumeId}/project-achievments/{projectAchievmentsId}")
    public ResponseEntity<Object> editProjectAchievments(
            @RequestBody RProjectAchievementsRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String projectAchievmentsId
    ) {
        return ResponseEntity.ok(resumeService.editProjectAchievments(request,studentId,resumeId,projectAchievmentsId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/project-achievments/{projectAchievmentsId}")
    public ResponseEntity<Object> deleteProjectAchievments(

            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String projectAchievmentsId
    ) {
        return ResponseEntity.ok(resumeService.deleteProjectAchievments(studentId,resumeId,projectAchievmentsId));
    }
    @PostMapping("/students/{studentId}/resumes/{resumeId}/autobiography")
    public ResponseEntity<Object> writeAutobiography(
            @RequestBody RAutobiographyRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createAutobiography(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resumes/{resumeId}/autobiography/{autobiographyId}")
    public ResponseEntity<Object> editAutobiography(
            @RequestBody RAutobiographyRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String autobiographyId
    ) {
        return ResponseEntity.ok(resumeService.editAutobiography(request,studentId,resumeId,autobiographyId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/autobiography/{autobiographyId}")
    public ResponseEntity<Object> deleteAutobiography(

            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String autobiographyId
    ) {
        return ResponseEntity.ok(resumeService.deleteAutobiography(studentId,resumeId,autobiographyId));
    }
    @PostMapping("/students/{studentId}/resumes/{resumeId}/work-experience")
    public ResponseEntity<Object> writeWorkExperience(
            @RequestBody RWorkExperienceRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createWorkExperience(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resumes/{resumeId}/work-experience/{workExperienceId}")
    public ResponseEntity<Object> editWorkExperience(
            @RequestBody RWorkExperienceRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String workExperienceId
    ) {
        return ResponseEntity.ok(resumeService.editWorkExperience(request,studentId,resumeId,workExperienceId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/work-experience/{workExperienceId}")
    public ResponseEntity<Object> deleteWorkExperience(
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String workExperienceId
    ) {
        return ResponseEntity.ok(resumeService.deleteWorkExperience(studentId,resumeId,workExperienceId));
    }
    @PostMapping("/students/{studentId}/resumes/{resumeId}/subject")
    public ResponseEntity<Object> writeSubject(
            @RequestBody RSubjectRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createSubject(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resumes/{resumeId}/subject/{subjectId}")
    public ResponseEntity<Object> editSubject(
            @RequestBody RSubjectRequest request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String subjectId
    ) {
        return ResponseEntity.ok(resumeService.editSubject(request,studentId,resumeId,subjectId));
    }
    @DeleteMapping("/students/{studentId}/resumes/{resumeId}/subject/{subjectId}")
    public ResponseEntity<Object> deleteSubject(

            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String subjectId
    ) {
        return ResponseEntity.ok(resumeService. deleteSubject(studentId,resumeId,subjectId));
    }
    @PostMapping("/students/{studentId}/resumes/{resumeId}/skill")
    public ResponseEntity<Object> writeSkill(
            @RequestBody RSkillCategory request,
            @PathVariable String studentId,
            @PathVariable String resumeId
    ) {
        return ResponseEntity.ok(resumeService.createSkill(request,studentId,resumeId));
    }
    @PutMapping("/students/{studentId}/resumes/{resumeId}/skill/{skillId}")
    public ResponseEntity<Object> updateSkill(
            @RequestBody RSkillCategory request,
            @PathVariable String studentId,
            @PathVariable String resumeId,
            @PathVariable String skillId
    ) {
        return ResponseEntity.ok(resumeService.updateSkill(studentId,resumeId,skillId,request));
    }




}
