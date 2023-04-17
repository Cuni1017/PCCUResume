package com.example.demo.service;

import com.example.demo.category.TeacherValidTypeCategory;

public interface TeacherService {
    Object findNewsById(String teacherId);

    Object findStudentReview(String teacherId);

    Object updateStudentReview(String teacherId, String studentId, TeacherValidTypeCategory teacherValidTypeCategory);

    Object findStudentByRole(String teacherId, String studentId);
}
