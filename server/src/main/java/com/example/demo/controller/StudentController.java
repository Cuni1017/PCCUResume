package com.example.demo.controller;


import com.example.demo.service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    @GetMapping("/students/{studentUsername}")
    public ResponseEntity<Object> findUserById(
            @PathVariable String studentUsername
    ) {
        return ResponseEntity.ok(studentService.findUserById(studentUsername));
    }
    @PutMapping("/v1/students/{studentUsername}/image/student-image")
    public ResponseEntity<Object> uploadStudentImage(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String studentUsername,
            HttpServletRequest httpServletRequest
    ) {
        return ResponseEntity.ok(studentService.uploadStudentImage(studentUsername,uploadFile,httpServletRequest));
    }
    @DeleteMapping("/v1/students/{studentUsername}/image/student-image")
    public ResponseEntity<Object> deleteStudentImage(
            @PathVariable String studentUsername
    ) {
        return ResponseEntity.ok(studentService.deleteStudentImage(studentUsername));
    }
}
