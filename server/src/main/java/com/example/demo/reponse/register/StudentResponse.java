package com.example.demo.reponse.register;

import com.example.demo.model.Student;
import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponse {
    User user;
    Student student;
}
