package com.example.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//@RestController
//@RequiredArgsConstructor
//public class TeacherController {
//    @GetMapping("/teacher/{teacherId}")
//    public ResponseEntity<Object> findUserById(
//            @PathVariable String studentUsername
//    ) {
//        return ResponseEntity.ok(studentService.findUserById(studentUsername));
//    }
//}