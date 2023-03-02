package com.example.demo.dto.resume.post;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RProjectAchievementsRequest {

    public String name;

    public Date startTime;

    public Date endTime;

    public String talk;

    public String url;

}
