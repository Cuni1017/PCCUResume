package com.example.demo.service.factory;

import com.example.demo.model.ApplyType;
import com.example.demo.service.factory.helper.SendEmailHelper;
import jakarta.mail.MessagingException;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@NoArgsConstructor
@Service
public class InterviewApplyStatusImpl implements ApplyStatusStrategy {
    @Autowired
    private SendEmailHelper sendEmailHelper;
    @Override
    public void sendStudentEmail(String email, String message) throws MessagingException {
        sendEmailHelper.sendEmail(email,message);
    }

    @Override
    public void sendTeacherEmail(String teacherEmail, String message) throws MessagingException {
        sendEmailHelper.sendEmail(teacherEmail,message);
    }

    @Override
    public String getForTeacherMessage(ApplyType applyType, String name, String teacherName, String vacanciesName) {
        String message = "這裡很高興的通知"+teacherName+"教授本系學生:";
        message = message + name;
        message = message +",面試的實習職缺"+ vacanciesName+"邀請他去面試,詳細情況公司會跟您確認";
        return message;
    }

    @Override
    public String getForStudentMessage(ApplyType applyType, String name, String vacanciesName) {
        String message = "這裡很高興的通知";
        message = message + name;
        message = message +",您實習中的實習職缺"+ vacanciesName+"邀請您去面試,詳細情況公司會跟您確認";
        return message;
    }
}
