//package com.example.demo.config;
//
//import jakarta.servlet.http.HttpServletRequest;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.core.io.ResourceLoader;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.io.IOException;
//
//import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
//class WebConfigTest implements WebMvcConfigurer {
//    @Autowired
//    private HttpServletRequest request;
//    @Autowired
//    private  ResourceLoader resourceLoader;
//    @Test
//    public void getRealFilePath() throws IOException {
//        String realPath = request.getServletContext().getRealPath("");
//        String uploadPath = realPath + "student";
//        System.out.println(uploadPath);
//        System.out.println(resourceLoader.getResource().getFile().getPath()+ "/data/images/");
//    }
//}