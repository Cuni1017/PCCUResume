package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageTeacherFileDto {
    private List<TeacherFileDto> teacherFileDtos;
    private long total;
    private int page;
    private int limit;


}
