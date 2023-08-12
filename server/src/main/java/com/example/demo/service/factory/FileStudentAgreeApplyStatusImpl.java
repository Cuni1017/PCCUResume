package com.example.demo.service.factory;

import com.example.demo.model.ApplyType;
import com.example.demo.service.factory.helper.SendEmailHelper;
import jakarta.mail.MessagingException;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@NoArgsConstructor
@Service
public class FileStudentAgreeApplyStatusImpl implements ApplyStatusStrategy {
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
        String message = "這裡很遺憾的通知"+teacherName+"教授本系學生:";
        message = message + name;
        message = message +",拒絕本公司的實習職缺"+ vacanciesName;
        return message;
    }

    @Override
    public String getForStudentMessage(ApplyType applyType, String name, String vacanciesName) {
        String message = "這裡很遺憾的通知";
        message = message + name;
        message = message +",您並未選擇本公司職缺"+ vacanciesName ;
        message = message +",沒關西我們會將您加入我們的人才儲備";
        return message;
    }
}
