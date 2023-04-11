package com.example.demo.service;

import com.example.demo.category.ApplyTimeCategory;
import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.model.ApplyType;

import java.time.LocalDate;

public interface CompanyForJobService {


    Object changeApply(String applyId, ChangeApplyTypeCategory changeApplyTypeCategory);

    Object updateApplyTime(String applyId, ApplyTimeCategory applyTimeCategory);





    Object findVacanciesApplyBycompanyName(String companyName,String applyType);
}
