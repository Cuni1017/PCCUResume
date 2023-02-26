package com.example.demo.model.resume;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "resume")
public class Resume {
    @Id
    @Column(name = "resume_id")
    public String resumeId;

    @Column(name = "user_id")
    public String userId;
    @Column(name = "image")
    public String image;

    @Column(name = "r_work_experience_id")
    public String rWorkExperienceId ;
    @Column(name = "r_work_hope_Id")
    public String rWorkHopeId;
    @Column(name ="r_project_achievements_id " )
    public String rProjectAchievmentsId ;
    @Column(name = "r_autobiography_id")
    public String rAutobiographyId;
    @Column(name ="r_special_skill_id" )
    public String rSpecialSkillId;
    @Column(name = "r_license_id")
    public String rLicenseID;

    @OneToMany(mappedBy = "resume")
    private List<RWorkExperience> rWorkExperience;
    @OneToMany(mappedBy = "resume")
    private List<RWorkHope> rWorkHope;
    @OneToMany(mappedBy = "resume")
    private List<RSpecialSkill> rSpecialSkill;

    @OneToMany(mappedBy = "resume")
    private List<RProjectAchievements> rProjectAchievements;
    @OneToMany(mappedBy = "resume")
    private List<RAutobiography> rAutobiography;
    @OneToMany(mappedBy = "resume")
    private List<RLicense> rLicense;
}
