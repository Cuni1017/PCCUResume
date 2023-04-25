package com.example.demo.dto;

import com.example.demo.model.Student;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class StudentReviewDto {
    private List<StudentDto> StudentDtos;
    private int page;
    private int limit;
    private long total;
}
