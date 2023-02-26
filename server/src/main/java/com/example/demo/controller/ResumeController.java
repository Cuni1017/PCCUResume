package com.example.demo.controller;

import com.example.demo.request.resume.post.ResumeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ResumeController {
    @GetMapping("/students/{studentId}/resume")
    public ResponseEntity<Object> findAllByRsume(
            @RequestBody CurriculumViateRequest curriculumViateRequest,
            @PathVariable String studentId
    ) {
        return ResponseEntity.ok(loginService.CurriculumViate(request));
    }
    @PostMapping("/students/{studentId}/resume")
    public ResponseEntity<Object> writeRsume(
            @RequestBody ResumeRequest resumeRequest,
            @PathVariable String studentId
    ) {
        return ResponseEntity.ok(loginService.CurriculumViate(request));
    }
}
