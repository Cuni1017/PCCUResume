package com.example.demo.controller;


import com.example.demo.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    @GetMapping("/students/{studentId}")
    public ResponseEntity<Object> findUserById(
            @PathVariable String studentId
    ) {
        return ResponseEntity.ok(studentService.findUserById(studentId));
    }
}
