package com.example.demo.dto;

import com.example.demo.model.TeacherFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherFileDto {
    private TeacherDto teacherDto;
    private TeacherFile teacherFile;
}
