package com.example.demo.reponse;

import com.example.demo.model.resume.Resume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ChooseResumeResponse {
    List<Resume> resume;
}
