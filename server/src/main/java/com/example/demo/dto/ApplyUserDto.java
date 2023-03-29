package com.example.demo.dto;

import com.example.demo.model.Apply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplyUserDto {

    private String studentRealName;
    private String applyId;
    private String vacanciesId;
    private String userId;
    private LocalDate createTime;

    private String applyType;
    private String companyId;
    private String resumeId;
}
