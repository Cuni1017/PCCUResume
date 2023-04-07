package com.example.demo.dto;

import com.example.demo.model.Apply;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplytypeVacnciesDto {
   private List<Apply> apply;
   private Vacancies vacancies;
}
