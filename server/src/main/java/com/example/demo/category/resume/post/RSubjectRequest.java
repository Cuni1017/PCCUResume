package com.example.demo.category.resume.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RSubjectRequest {
    private String subjectName ;
    private int subjectScore ;
    private int subjectRank;
    private int subjectTotalPeople;
    private String subjectTalk ;
}
