package com.example.demo.reponse;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RWorkExperienceResponse {
    private String id;
    private String name;
    private String department;
    private String companyName;
}
