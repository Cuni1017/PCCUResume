package com.example.demo.controller;


import com.example.demo.category.ApplyTimeCategory;
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
    @GetMapping("company/{companyName}/company-for-job")
    public ResponseEntity<Object> findApplyVacanciesByCompanyName(
            @PathVariable String companyName,
            @RequestParam(required = false) String applyType
    ){

        return ResponseEntity.ok( companyForJobService.findVacanciesApplyBycompanyName(companyName,applyType));
    }


    @PutMapping("/company/company-for-job/{applyId}")
    public ResponseEntity<Object> changeCompanyApplyType(
            @PathVariable String applyId,
            @RequestBody ChangeApplyTypeCategory changeApplyTypeCategory


    ){
        return ResponseEntity.ok( companyForJobService.changeApply(applyId,changeApplyTypeCategory));
    }
    @PutMapping("/company/company-for-job/{applyId}/insert-apply-time")
    public ResponseEntity<Object> updateApplyTime(
            @PathVariable String applyId,
            @RequestBody ApplyTimeCategory applyTimeCategory

            ){

        return ResponseEntity.ok( companyForJobService.updateApplyTime(applyId,applyTimeCategory));

    }
}
