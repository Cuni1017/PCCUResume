package com.example.demo.reponse;

import com.example.demo.model.resume.Resume;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RProjectAchievementsResponse {
    private String id;

    private String name;

    private Date startTime;

    private Date endTime;

    private String talk;

    private String url;

    private Resume resume;

}
