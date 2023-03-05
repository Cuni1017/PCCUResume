package com.example.demo.service;

import com.example.demo.dto.resume.post.*;
import com.example.demo.model.resume.Resume;

public interface ResumeService {
    Object createBasicResume(ResumeRequest Request,String studentId);
    Object createSpecialSkill(RSpecialSkillRequest Request, String studentId,String resumeId) ;
    Object createLicense(RlicenseRequest Request, String studentId, String resumeId) ;

    Object createProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId);
    Object createAutobiography(RAutobiographyRequest request, String studentId, String resumeId);

    Object createWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId);

    Object editWorkHope(RWorkHopeRequest request, String studentId,String resumeId, String workHopeId);

    Object deleteWorkHope(RWorkHopeRequest request, String studentId, String resumeId, String workHopeId);

    Object editSpecialSkill(RSpecialSkillRequest request, String studentId, String resumeId, String specialSkillId);

    Object deleteSpecialSkill(RSpecialSkillRequest request, String studentId, String resumeId, String specialSkillId);

    Object editLicense(RlicenseRequest request, String studentId, String resumeId, String licenseId);

    Object deleteLicense(RlicenseRequest request, String studentId, String resumeId, String licenseId);

    Object editProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId, String projectAchievmentsId);

    Object deleteProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId, String projectAchievmentsId);

    Object editAutobiography(RAutobiographyRequest request, String studentId, String resumeId, String autobiographyId);

    Object deleteAutobiography(RAutobiographyRequest request, String studentId, String resumeId, String autobiographyId);

    Object editWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId, String workExperienceId);

    Object deleteWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId, String workExperienceId);

    Object findAllResumeByIdAndResumeId(String studentId,String resumeId);

    Object chooseResume(String studentId);
}
