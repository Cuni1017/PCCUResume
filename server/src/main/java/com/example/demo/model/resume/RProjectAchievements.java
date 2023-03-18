package com.example.demo.model.resume;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "r_project_achievements")
public class RProjectAchievements {
    @Id
    @Column(name = "project_achievements_id")
    public String id;
    @Column(name = "user_id")
    public String userId;
    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "name")
    public String name;
    @Column(name = "start_time")
    public LocalDate startTime;
    @Column(name = "end_time")
    public String endTime;
    @Column(name = "talk")
    public String talk;
    @Column(name = "url")
    public String url;


}
