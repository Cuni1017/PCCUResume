package com.example.demo.dto.resume.post;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RWorkExperienceRequest {

    public String name;

    public String department;
        public String companyName;
}
