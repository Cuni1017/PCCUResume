package com.example.demo.service.factory;

import com.example.demo.model.ApplyType;
import com.example.demo.service.factory.helper.SendEmailHelper;
import jakarta.mail.MessagingException;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@NoArgsConstructor
@Service
public class StudentAgreeApplyStatusImpl implements ApplyStatusStrategy {
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
        String message = "這裡很高興的通知";
        message = message + teacherName+"教授本系學生:"+name;
        message = message +"應徵的實習職缺"+ vacanciesName+"成功,";
        message = message +"需要等該學生前往實習網站進行確認應徵動作,如沒有確認此職缺會消失";
        return message;
    }

    @Override
    public String getForStudentMessage(ApplyType applyType, String name, String vacanciesName) {
        String message = "這裡很高興的通知";
        message = message + name;
        message = message +",您應徵的實習職缺"+ vacanciesName+"成功,";
        message = message +"需要等你前往實習網站進行確認應徵動作,如沒有確認此職缺會消失";
        return message;
    }
}
