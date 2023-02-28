package com.example.demo.controller;


import com.example.demo.dto.resume.post.ResumeRequest;
import com.example.demo.service.ResumeService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ResumeController {
    private final ResumeService resumeService;
//    @GetMapping("/students/{studentId}/resume")
//    public ResponseEntity<Object> findAllByRsume(
//            @RequestBody ResumeRequest resumeRequest,
//            @PathVariable String studentId
//    ) {
//        return ResponseEntity.ok(.createBasicResume(request));
//    }

    @PostMapping("/students/{studentId}/resume")
    public ResponseEntity<Object> writeBasicResume(
            @RequestBody ResumeRequest request,
            @PathVariable String studentId
    ) {

        return ResponseEntity.ok(resumeService.createBasicResume(request,studentId));
    }
}
