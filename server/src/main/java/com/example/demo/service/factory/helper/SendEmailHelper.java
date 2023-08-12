package com.example.demo.service.factory.helper;

import com.example.demo.model.MikeEmail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
@RequiredArgsConstructor
@Component
public class SendEmailHelper {
    private String email;
    private String message;
    private final JavaMailSender mailSender;
//    MimeMessagePreparator messagePreparator = mimeMessage -> {
//
//
//        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
//        messageHelper.setFrom(MikeEmail.email.myEmail.toString());
//        messageHelper.setTo(email);
//        messageHelper.setSubject("pccu通知有關實習資訊");
//        messageHelper.setText(message);
//    };
        public void sendEmail( String email, String message) throws MessagingException {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(MikeEmail.email.myEmail.toString());
            messageHelper.setTo(email);
            messageHelper.setSubject("pccu通知有關實習資訊");
            messageHelper.setText(message);
            mailSender.send(mimeMessage);
        }


}
