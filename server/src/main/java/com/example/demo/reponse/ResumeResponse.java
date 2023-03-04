package com.example.demo.reponse;

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
public class ResumeResponse {
    private  String resumeId;
    private String userId;
    private int number;
    private School school;
    private RWorkHopeResponse rWorkHopeResponse;
    private List<RWorkExperienceResponse> rWorkExperienceResponse;
    private List<RSpecialSkillResponse> rSpecialSkillResponse;
    private List<RProjectAchievementsResponse> rProjectAchievementsResponse;
    private RAutobiographyResponse rAutobiographyResponse;
    private List<RLicenseResponse> rLicenseResponse;
}
