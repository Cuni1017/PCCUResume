package com.example.demo.controller;


import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.service.CompanyForJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.ApplyType;

import java.time.LocalDate;

@RequiredArgsConstructor
@RestController
public class CompanyForJobController {
    private  final CompanyForJobService companyForJobService;
    @GetMapping("/company/vacancies/{vacanciesId}/company-for-job")
    public ResponseEntity<Object> findUserResume(
            @PathVariable String vacanciesId,
            @RequestParam(required = false) ChangeApplyTypeCategory changeApplyTypeCategory
    ){
//        try{
//            ApplyType newApplyType = ApplyType.valueOf(applyType);
//
//        }catch (RuntimeException ex){
//            ex.getMessage();
//        }
        return ResponseEntity.ok( companyForJobService.findVacanciesAndAppliesById(vacanciesId,changeApplyTypeCategory));
    }
    @PutMapping("/company/company-for-job/{applyId}")
    public ResponseEntity<Object> changeApplyType(
            @PathVariable String applyId,
            @RequestBody ChangeApplyTypeCategory changeApplyTypeCategory


    ){

        return ResponseEntity.ok( companyForJobService.changeApply(applyId,changeApplyTypeCategory));

    }
    @PutMapping("/company/company-for-job/{applyId}/insert-apply-time")
    public ResponseEntity<Object> updateApplyTime(
            @PathVariable String applyId,
            @RequestBody LocalDate applyStartTime,
            @RequestBody LocalDate applyEndTime
            ){

        return ResponseEntity.ok( companyForJobService.updateApplyTime(applyId,applyStartTime,applyEndTime));

    }
}
