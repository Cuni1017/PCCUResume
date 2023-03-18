package com.example.demo.config;

import com.example.demo.dao.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private HttpServletRequest request;
    private String getRealFilePath(){
        String realPath = request.getServletContext().getRealPath("");
        String uploadPath = realPath + "upload\\";
        return uploadPath;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String path = getRealFilePath();
        registry.addResourceHandler("/images/**").addResourceLocations("file:"+path);
        //System.out.println("file:"+fileSavePath);
    }


}
