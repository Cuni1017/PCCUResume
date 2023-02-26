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
@Table(name = "cv_work_experience")
public class RWorkExperience {
    @Id
    @Column(name = "id")
    public String id;
    @Column(name = "user_id")
    public String userId;
    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "name")
    public String name;
    @Column(name = "department")
    public String department;
    @Column(name = "company_name")
    public String companyName;
    @ManyToOne
    @JoinColumn(name = "r_work_experience_id")
    public Resume resume;



}
