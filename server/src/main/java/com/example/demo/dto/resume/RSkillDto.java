package com.example.demo.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RSkillDto {
    String rSkillId;
    String skillId;
    String skillName;
}
