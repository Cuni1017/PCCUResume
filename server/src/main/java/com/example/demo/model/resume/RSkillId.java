package com.example.demo.model.resume;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RSkillId {
    @Column(name = "r_skill_id")
    private String rSkillId;
    @Column(name = "skill_id")
    private int skillId;
    @Column(name = "resume_id")
    private String resumeId;
}
