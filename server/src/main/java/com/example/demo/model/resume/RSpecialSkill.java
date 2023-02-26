package com.example.demo.model.resume;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cv_special_skill")
public class RSpecialSkill {
    @Id
    @Column(name = "id")
    public String id;
    @Column(name = "user_id")
    public String userId;
    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "name")
    public String name;
    @Column(name = "talk")
    public String talk;
    @Column(name = "special")
    public String special;
    @ManyToOne
    @JoinColumn(name = "r_special_skill_id")
    public Resume resume;
}
