package com.example.demo.service.factory;

import com.example.demo.model.ApplyType;
import com.example.demo.model.MikeEmail;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
public interface ApplyStatusStrategy {

     void sendStudentEmail(String email, String message) throws MessagingException;
     void sendTeacherEmail(String teacherEmail,String message) throws MessagingException;
     String getForTeacherMessage(ApplyType applyType,String name ,String teacherName,String vacanciesName);
     String getForStudentMessage(ApplyType applyType,String name ,String vacanciesName);
}
