package com.example.demo.service;

import com.example.demo.model.resume.Resume;
import com.example.demo.dto.resume.post.ResumeRequest;

public interface ResumeService {
    Resume createBasicResume(ResumeRequest resumeRequest,String studentId);
}
