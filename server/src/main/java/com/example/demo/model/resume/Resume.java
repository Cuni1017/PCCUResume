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
    @Column(name = "id")
    public String resumeId;

    @Column(name = "user_id")
    public String userId;

    @Column(name = "number")
    public int number;
    @Enumerated(EnumType.STRING)
    public School school;




//    @OneToMany(mappedBy = "resume")
//    private List<RWorkExperience> rWorkExperience;
//
//    @OneToOne(mappedBy = "resume")
//    private RWorkHope rWorkHope;
//
//    @OneToMany(mappedBy = "resume")
//    private List<RSpecialSkill> rSpecialSkill;
//
//    @OneToMany(mappedBy = "resume")
//    private List<RProjectAchievements> rProjectAchievements;
//    @OneToOne(mappedBy = "resume")
//    private RAutobiography rAutobiography;
//    @OneToMany(mappedBy = "resume",cascade=CascadeType.ALL)
//    private List<RLicense> rLicense;
}
