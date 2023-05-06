package com.example.demo.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface CompanyAboutService {

    Object uploadLogoImage(MultipartFile uploadFile, String companyId, HttpServletRequest httpServletRequest);

    Object uploadBackgroundImage(MultipartFile uploadFile, String companyId, HttpServletRequest httpServletRequest);
}
