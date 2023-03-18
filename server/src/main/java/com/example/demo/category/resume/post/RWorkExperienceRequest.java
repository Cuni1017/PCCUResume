package com.example.demo.category.resume.post;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RWorkExperienceRequest {

    public String name;

    public String department;
    public String companyName;
    public LocalDate startTime;

    public String endTime;
}
