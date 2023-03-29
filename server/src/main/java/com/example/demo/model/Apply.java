package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "apply")
public class Apply {
    @Id
    @Column(name = "apply_id")
    private String applyId;
    @Column(name = "vacancies_id")
    private String vacanciesId;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "resume_id")
    private String resumeId;
    @Column(name = "company_id")
    private String companyId;
    @Column(name = "create_time")
    private LocalDate createTime;
    @Column(name = "apply_before_talk")
    private String applyBeforeTalk;
    @Column(name = "apply_number")
    private int applyNumber;
    @Column(name = "apply_type")
    private String applyType;
    @Column(name = "apply_email")
    private String applyEmail;
    @Column(name = "apply_start_time")
    private LocalDate applyStartTime;
    @Column(name = "apply_end_time")
    private LocalDate applyEndTime;

}
