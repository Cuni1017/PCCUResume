package com.example.demo.reponse.student;

import com.example.demo.model.Student;
import com.example.demo.model.User;
import com.example.demo.model.resume.Resume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentResponse {
    List<Resume> resume;
    Student student;

}
