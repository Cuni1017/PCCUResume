package com.example.demo.model.resume;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "r_skill")
public class RSkill {
    @Id
    @Column(name = "skill_id")
    public String skillId;

    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "r_skill_id")
    public String rSkillId;

}
