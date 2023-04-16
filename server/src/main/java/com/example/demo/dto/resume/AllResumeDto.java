package com.example.demo.dto.resume;

import com.example.demo.model.resume.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllResumeDto {
    private  String name;
    private  String resumeId;
    private String userId;
    private String imageUrl;
    private String number;
    private School school;
    private RWorkHope rWorkHope;
    private List<RWorkExperience> rWorkExperience;
    private List<RSpecialSkill> rSpecialSkill;
    private List<RProjectAchievements> rProjectAchievements;
    private RAutobiography rAutobiography;
    private List<RLicense> rLicense;
    private List<RSubject> rSubject;
    private List<RSkill> rSkills;
}
