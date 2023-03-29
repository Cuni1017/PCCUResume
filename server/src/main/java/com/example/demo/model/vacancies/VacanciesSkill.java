package com.example.demo.model.vacancies;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vacancies_skill")
public class VacanciesSkill {
    @EmbeddedId
    private VacanciesSkillId vacanciesSkillId;
}
