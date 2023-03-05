package com.example.demo.service.impl;


import com.example.demo.dto.StudentRegisterRequest;
import com.example.demo.dao.*;
import com.example.demo.config.error.MailException;
import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.model.*;
import com.example.demo.dto.*;
import com.example.demo.service.JwtService;
import com.example.demo.service.RegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {
  private final UserRepository userRepository;
  private final StudentRepository studentRepository;
  private final TokenRepository tokenRepository;
  private final CompanyRepository companyRepository;
  private final TeacherRepository teacherRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final JavaMailSender mailSender;
//    public String checkEmail(String usertId, JpaRepository jpaRepository, checkEmailDto request) {
//        if(request.getInputMsg().equals(request.getValidMsg())){
//            User user = userRepository.findById(usertId).orElseThrow();
//            if(user.getId().startsWith("S")){
//                user.setRole(Role.STUDENT);
//            } else if (user.getId().startsWith("C")) {
//                user.setRole(Role.COMPANY);
//            }
//            user.setIsValid(1);
//            userRepository.updateRoleById(user.getIsValid(),user.getRole(),usertId);
//            return "驗證成功";
//        }else{
//
//            throw new userNotFoundException("驗證失敗");
//        }
//    }
    public String studentRegister(StudentRegisterRequest request) {

        if(!userRepository.findByUsername(request.getStudentUsername()).isEmpty()){
           throw  new UserNotFoundException("這帳號被註冊過了");
        }
        String  studentId = getId(userRepository,"Student");
        Student student   = studentBuilder(request);
        User    user      = User.builder()
                .id(studentId)
                .username(request.getStudentUsername())
                .email(request.getStudentEmail())
                .password(passwordEncoder.encode(request.getStudentPassword()))
                .role(Role.STUDENT)

                .build();
        userRepository.save(user);
        studentRepository.save(student);

        return "儲存成功";
    }

    public String companyRegister(CompanyRegisterDto request) {
        if(!companyRepository.findByCompanyUsername(request.getCompanyUsername()).isEmpty()){
            throw  new UserNotFoundException("這帳號被註冊過了");
        }
        String companyId  = getId(companyRepository,"Company");
        Company company   = companyBuilder(request);

        User    user      = User.builder()
                .id(companyId)
                .username(request.getCompanyUsername())
                .email(request.getCompanyEmail())
                .password(passwordEncoder.encode(request.getCompanyPassword()))
                .role(Role.COMPANY)

                .build();

        userRepository.save(user);
        companyRepository.save(company);
        return "儲存成功";
    }

    public String teacherRegister(TeacherRegisterDto request) {
        if(!teacherRepository.findByTeacherUsername(request.getTeacherUsername()).isEmpty()){
            throw  new UserNotFoundException("這帳號被註冊過了");
        }
        String  teacherId = getId(teacherRepository,"Teacher");
        Teacher teacher   = teacherBuilder(request);
        User    user      = User.builder()
                .id(teacherId)
                .username(request.getTeacherUsername())
                .email(request.getTeacherEmail())
                .password(passwordEncoder.encode(request.getTeacherPassword()))
                .role(Role.TEACHER)
                .build();

        userRepository.save(user);
        teacherRepository.save(teacher);
        return "儲存成功";
    }

    public String sendEmail(String email) {
        String  random    = getValidRandom();
        if(!userRepository.findBymyEmail(email).isEmpty()){
            throw new UserNotFoundException("email被使用");
        }
        try {
            sendEmail(email,random);
        }catch (MailException E){
            return "email 錯誤";
        }
        return random;
    }



    private String getId(JpaRepository repository , String idType){
        long userCount = repository.count();
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMdd");
        String today =ft.format(dNow);
        int intToday = Integer.valueOf(today);
        intToday *=100;
        intToday +=userCount;
        idType = idType.substring(0,1);
        String studentId = idType + intToday;
        return studentId;
    }
    private String getValidRandom(){
        String random = "R"+ (int)(Math.random()*1000000);
        return random;
    }
    private Student studentBuilder(StudentRegisterRequest request){
        String studentId = getId(userRepository,"Student");
        var student = Student.builder()
                .student_id(studentId)
                .student_name(request.getStudentName())
                .student_username(request.getStudentUsername())
                .student_email(request.getStudentEmail())
                .student_password(passwordEncoder.encode(request.getStudentPassword()))
                .build();
        return student;
    }
    private Company companyBuilder(CompanyRegisterDto request){
        String companyId = getId(companyRepository,"Company");
        var company = Company.builder()
                .companyId(companyId)
                .companyName(request.getCompanyName())
                .companyTitle(request.getCompanyTitle())
                .companyUsername(request.getCompanyUsername())
                .companyPassword(passwordEncoder.encode(request.getCompanyPassword()))
                .companyNumber(request.getCompanyNumber())
                .companyCounty(request.getCompanyCounty())
                .companyDistrict(request.getCompanyDistrict())
                .companyAddress(request.getCompanyAddress())
                .companyEmail(request.getCompanyEmail())
                .build();
        return company;
    }
    private Teacher teacherBuilder(TeacherRegisterDto request){
        String teacherId = getId(teacherRepository,"Teacher");
        Teacher teacher = Teacher
                .builder()
                .teacherId(teacherId)
                .teacherName(request.getTeacherName())
                .teacherUsername(request.getTeacherUsername())
                .teacherPassword(passwordEncoder.encode(request.getTeacherPassword()))
                .teacherEmail(request.getTeacherEmail())
                .build();
        return teacher;
    }

    private void sendEmail(String userEmail ,String random) throws MailException {
        MimeMessagePreparator messagePreparator = mimeMessage -> {

            String message = "pccu實習驗證信箱";
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(userEmail);
            messageHelper.setTo(userEmail);
            messageHelper.setSubject(message);
            messageHelper.setText(random);
        };
        mailSender.send(messagePreparator);
    }


//  private String getStudentId(){
//      long userCount = studentRepository.count();
//      Date dNow = new Date( );
//      SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMdd");
//      String today =ft.format(dNow);
//      int intToday = Integer.valueOf(today);
//      intToday *= 10000000;
//      intToday +=userCount;
//      String studentId = "S" + intToday;
//      return studentId;
//  }



}
