package com.example.demo.dto.applyforjob;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplyCompanyDto {
    private String vacanciesId;
    private String vacanciesName;
    private String companyId;
    private String companyName;
    private String companyImageUrl;
}
