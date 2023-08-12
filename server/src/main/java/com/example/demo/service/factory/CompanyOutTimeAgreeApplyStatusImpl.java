package com.example.demo.service.factory;

import com.example.demo.model.ApplyType;
import jakarta.mail.MessagingException;

public class CompanyOutTimeAgreeApplyStatusImpl implements ApplyStatusStrategy {
    @Override
    public void sendStudentEmail(String email, String message) throws MessagingException {
        
    }

    @Override
    public void sendTeacherEmail(String teacherEmail, String message) throws MessagingException {

    }

    @Override
    public String getForTeacherMessage(ApplyType applyType, String name, String teacherName, String vacanciesName) {
        return null;
    }

    @Override
    public String getForStudentMessage(ApplyType applyType, String name, String vacanciesName) {
        return null;
    }
}
