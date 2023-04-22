package com.example.demo.config;

import com.example.demo.dao.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@RequiredArgsConstructor
public class    WebConfig implements WebMvcConfigurer {
    private HttpServletRequest request;
    private String getStudentRealFilePath(){
        String realPath = request.getServletContext().getRealPath("");
        String uploadPath = realPath + "StudentUpload\\";
        return uploadPath;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        String Studentpath = getStudentRealFilePath();
//        registry.addResourceHandler("/images/**").addResourceLocations("file:"+path);

        //System.out.println("file:"+fileSavePath);
    }



}
