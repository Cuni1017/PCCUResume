package com.example.demo.config;

import com.example.demo.dao.UserRepository;
import com.example.demo.model.ImagePath;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@RequiredArgsConstructor
@Configuration
public class   WebConfig implements WebMvcConfigurer {
    private HttpServletRequest request;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/company-background/**").addResourceLocations("file:"+ "C:\\pccu-image\\company-background\\");
        registry.addResourceHandler("/image/company-logo/**").addResourceLocations("file:"+ "C:\\pccu-image\\company-logo\\");
        registry.addResourceHandler("/teacher-file/**").addResourceLocations("file:"+ "C:\\pccu-image\\teacher-file\\");
        registry.addResourceHandler("/image/student-image/**").addResourceLocations("file:"+ "C:\\pccu-image\\student-image\\");


    }



}
