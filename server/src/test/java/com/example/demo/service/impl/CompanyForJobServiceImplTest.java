package com.example.demo.service.impl;

import com.example.demo.dao.resume.*;
import com.example.demo.dto.resume.AllResumeDto;
import com.example.demo.model.resume.*;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@Service
@RequiredArgsConstructor
class CompanyForJobServiceImplTest {

    private final ResumeRepository resumeRepository;
    private final RWorkHopeRepository rWorkHopeRepository;
    private final RSpecialSkillRepository rSpecialSkillRepository;
    private final RLicenseRepository rLicenseRepository;
    private final RProjectAchievementsRepository rProjectAchievementsRepository;
    private final RAutobiographyRepository rAutobiographyRepository;
    private final RWorkExperienceRepository rWorkExperienceRepository;

    private final RSubjectRepository rSubjectRepository;
    @Test
    public void findUserResume() {

        String userId = "dsasd" ;
        String resumeId = "R2023022801" ;
        Resume resume =resumeRepository.findByUserIdAndResumeId(userId,resumeId);
        RAutobiography rAutobiography =rAutobiographyRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RLicense> rLicense =rLicenseRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RProjectAchievements> rProjectAchievements =rProjectAchievementsRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RSpecialSkill> rSpecialSkill = rSpecialSkillRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RWorkExperience> rWorkExperience=rWorkExperienceRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RSubject> rSubject = rSubjectRepository.findByUserIdAndResumeId(userId,resumeId);
        RWorkHope rworkHope = rWorkHopeRepository.findByUserIdAndResumeId(userId,resumeId);
        AllResumeDto allResume = AllResumeDto.builder()
                .name(resume.name)
                .userId(userId)
                .resumeId(resumeId)
                .school(resume.school)
                .rProjectAchievements(rProjectAchievements)
                .rAutobiography(rAutobiography)
                .rSpecialSkill(rSpecialSkill)
                .rLicense(rLicense)
                .rWorkHope(rworkHope)
                .rWorkExperience(rWorkExperience)
                .rSubject(rSubject)
                .build();
        System.out.println(allResume);

    }
}