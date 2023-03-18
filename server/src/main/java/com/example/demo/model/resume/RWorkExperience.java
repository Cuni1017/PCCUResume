package com.example.demo.model.resume;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "r_work_experience")
public class RWorkExperience {
    @Id
    @Column(name = "work_experience_id")
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

    @Column(name = "start_time")
    public LocalDate startTime;
    @Column(name = "end_time")
    public String endTime;



}
