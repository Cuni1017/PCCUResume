package com.example.demo.service;

import com.example.demo.category.post.*;
import com.example.demo.category.resume.post.*;
import com.example.demo.dto.resume.post.*;

public interface ResumeService {
    Object createBasicResume(ResumeRequest Request, String studentId);
    Object createSpecialSkill(RSpecialSkillRequest Request, String studentId,String resumeId) ;
    Object createLicense(RlicenseRequest Request, String studentId, String resumeId) ;

    Object createProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId);
    Object createAutobiography(RAutobiographyRequest request, String studentId, String resumeId);

    Object createWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId);
    Object createWorkHope(RWorkHopeRequest request, String studentId, String resumeId);
    Object editWorkHope(RWorkHopeRequest request, String studentId,String resumeId, String workHopeId);

    Object deleteWorkHope( String studentId, String resumeId, String workHopeId);

    Object editSpecialSkill(RSpecialSkillRequest request, String studentId, String resumeId, String specialSkillId);

    Object deleteSpecialSkill( String studentId, String resumeId, String specialSkillId);

    Object editLicense(RlicenseRequest request, String studentId, String resumeId, String licenseId);

    Object deleteLicense(String studentId, String resumeId, String licenseId);

    Object editProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId, String projectAchievmentsId);

    Object deleteProjectAchievments( String studentId, String resumeId, String projectAchievmentsId);

    Object editAutobiography(RAutobiographyRequest request, String studentId, String resumeId, String autobiographyId);

    Object deleteAutobiography( String studentId, String resumeId, String autobiographyId);

    Object editWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId, String workExperienceId);

    Object deleteWorkExperience( String studentId, String resumeId, String workExperienceId);

    Object findAllResumeByIdAndResumeId(String studentId,String resumeId);

    Object chooseResume(String studentId);

    Object deleteAllResumeById(String studentId, String resumeId);


<<<<<<< HEAD
    Object findUserById(String studentId);

    Object createSubject(RSubjectRequest request, String studentId, String resumeId);

    Object editSubject(RSubjectRequest request, String studentId, String resumeId, String subjectId);

    Object deleteSubject(String studentId, String resumeId, String subjectId);
=======

>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00
}
