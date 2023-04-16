package com.example.demo.category;

import com.example.demo.model.TeacherValidType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherValidTypeCategory {
    private TeacherValidType teacherValidType;
}
