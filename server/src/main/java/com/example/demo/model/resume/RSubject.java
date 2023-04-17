package com.example.demo.model.resume;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.lang.model.element.Name;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "r_subject")
public class RSubject {
    @Id
    @Column(name = "subject_id")
    private String Id ;
    @Column(name = "resume_id")
    private String resumeId ;
    @Column(name = "user_id")
    private String userId ;
    @Column(name = "subject_name")
    private String subjectName ;
    @Column(name = "subject_score")
    private int subjectScore ;
    @Column(name = "subject_rank")
    private int subjectRank;
    @Column(name = "subject_total_people")
    private int subjectTotalPeople;
    @Column(name = "subject_talk")
    private String subjectTalk;

}
