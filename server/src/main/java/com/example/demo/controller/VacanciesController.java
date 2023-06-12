package com.example.demo.controller;

import com.example.demo.dao.UserRepository;
import com.example.demo.model.User;
import com.example.demo.service.JwtService;
import com.example.demo.service.VacanciesService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VacanciesController {
    private final VacanciesService VacanciesService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    @GetMapping("/vacancies")
    public ResponseEntity<Object> findPageVacancies(
           @RequestParam(required = false) List<String> technology,
           @RequestParam(required = false) List<String> county ,
           @RequestParam(required = false) String salaryType,
           @RequestParam(defaultValue = "100000000000",required = false) Long salaryMax ,
           @RequestParam(defaultValue = "1" ,required = false) int salaryMin,
           @RequestParam(defaultValue = "vacancies_id",required = false ) String order,
           @RequestParam(defaultValue = "1" ,required = false  ) int page,
           @RequestParam(defaultValue = "10",required = false ) int limit,
           @NonNull HttpServletRequest request
           ) {
            User user= getUser(request);
                return ResponseEntity.ok(VacanciesService.findPageVacancies(county,technology,salaryType,salaryMax,salaryMin,order,page,limit,user));
    }
    @GetMapping("/vacancies/{vacanciesId}")
    public ResponseEntity<Object> findVacanciesById(
            @PathVariable String vacanciesId
    ) {
        return ResponseEntity.ok(VacanciesService.findFullVacanciesById(vacanciesId));
    }
    @GetMapping("/vacancies/skills")
    public ResponseEntity<Object> findSkills(
    ) {
        return ResponseEntity.ok(VacanciesService.findSkills());
    }
    @GetMapping("/vacancies/counties")
    public ResponseEntity<Object> findCounties(
    ) {
        return ResponseEntity.ok(VacanciesService.findCounties());
    }
    private User getUser(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if(authHeader==null){
            return  null;
        }

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }

        String jwt = authHeader.substring(7); // 提取 JWT Token
        if (jwt.length() < 7) {
            throw new IllegalArgumentException("Invalid JWT Token");
        }

        String username = jwtService.extractUsername(jwt); // 根据 JWT 提取用户名
        if (username == null) {
            throw new IllegalArgumentException("Invalid JWT Token");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("没有此學生"));

        return user;
    }
}
