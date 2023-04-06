package com.example.demo.service;

import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.model.ApplyType;

import java.time.LocalDate;

public interface CompanyForJobService {


    Object changeApply(String applyId, ChangeApplyTypeCategory changeApplyTypeCategory);

    Object updateApplyTime(String applyId, LocalDate applyStartTime, LocalDate applyEndTime);



    Object findUserResume(String userId, String resumeId);

    Object findVacanciesApplyBycompanyName(String companyName);
}
