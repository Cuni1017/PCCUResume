package com.example.demo.service;

import com.example.demo.category.CompanyAboutBasicCategory;
import com.example.demo.category.CompanyAboutServiceCategory;
import com.example.demo.category.CompanyAboutWelfareCategory;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface CompanyAboutService extends BasicService{

    Object uploadLogoImage(MultipartFile uploadFile, String companyName, HttpServletRequest httpServletRequest);

    Object uploadBackgroundImage(MultipartFile uploadFile, String companyName, HttpServletRequest httpServletRequest);

    Object createCompanyAboutBasic(String companyName, CompanyAboutBasicCategory companyAboutBasicCategory);

    Object updateCompanyAboutBasic(String companyName, CompanyAboutBasicCategory companyAboutBasicCategory);

    Object deleteCompanyAboutBasic(String companyName);

    Object findCompanyAboutBasicByCompanyName(String CompanyName);

    Object createCompanyAboutService(String companyName, CompanyAboutServiceCategory companyAboutBasicCategory);

    Object updateCompanyAboutService(String companyName, CompanyAboutServiceCategory companyAboutBasicCategory);

    Object deleteCompanyAboutService(String companyName);

    Object findCompanyAboutServiceByCompanyName(String companyName);

    Object createCompanyAboutWelfare(String companyName, CompanyAboutWelfareCategory companyAboutWelfareCategory);

    Object updateCompanyAboutWelfare(String companyName, CompanyAboutWelfareCategory companyAboutWelfareCategory);

    Object deleteCompanyAboutWelfare(String companyName);

    Object findCompanyAboutWelfareByCompanyName(String companyName);

    Object findAllCompanyAboutByCompanyName(String companyName);
}
