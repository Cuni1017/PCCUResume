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
        registry.addResourceHandler("/image/company-background/**").addResourceLocations("file:"+ "D:\\image\\company-background\\");
        registry.addResourceHandler("/image/company-logo/**").addResourceLocations("file:"+ "D:\\image\\company-logo\\");


    }



}
