package com.example.demo.dto.applyforjob;

import com.example.demo.model.resume.Resume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplyVacanciesDto {

    private ApplyCompanyDto applyCompanyDto;
    private String StudentId;
    private String StudentUsername;
    private String StudentEmail;
    private String StudentImageUrl;
    private String StudentNumber;
    private List<Resume> resumes;
}
