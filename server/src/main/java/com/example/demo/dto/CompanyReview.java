package com.example.demo.dto;

import com.example.demo.model.Company;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyReview {
    private List<Company> companies;
    private int page;
    private int limit;
    private long total;
}
