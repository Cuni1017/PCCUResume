package com.example.demo.service.impl;


import com.example.demo.category.CompanyRegisterCategory;
import com.example.demo.category.StudentRegisterCategory;
import com.example.demo.category.TeacherRegisterCategory;
import com.example.demo.dao.*;
import com.example.demo.config.error.MailException;
import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.model.*;
import com.example.demo.dto.RestDto;
import com.example.demo.reponse.register.CompanyResponse;
import com.example.demo.dto.StudentDto;
import com.example.demo.reponse.register.TeacherResponse;
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
import java.time.LocalDate;
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
    public Object studentRegister(StudentRegisterCategory request) {

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
                .role(Role.USER)
                .name(student.getStudentName())
                .build();
        userRepository.save(user);
        studentRepository.save(student);
        StudentDto studentResponse= StudentDto.builder()
                .studentId(student.getStudentId())
                .studentName(student.getStudentName())
                .studentImageUrl(student.getStudentImageUrl())
                .studentEmail(student.getStudentEmail())
                .studentNumber(student.getStudentNumber())
                .studentUsername(student.getStudentUsername())
                .pccuId(student.getPccuId())
                .role(user.getRole().toString())
                .build();
        RestDto restResponse = RestDto.builder()
                .data(studentResponse)
                .message("儲存成功")
                .build();
        return restResponse;

    }

    public Object companyRegister(CompanyRegisterCategory request) {
        if(!companyRepository.findByCompanyUsername(request.getCompanyUsername()).isEmpty()){
            throw  new UserNotFoundException("這帳號被註冊過了");
        }
        if(!companyRepository.findByCompanyName(request.getCompanyName()).isEmpty()){
            throw  new UserNotFoundException("這COMPANYNAME被註冊過了");
        }
        String companyId  = getId(companyRepository,"Company");
        Company company   = companyBuilder(request);

        User user = User.builder()
                .id(companyId)
                .username(request.getCompanyUsername())
                .email(request.getCompanyEmail())
                .password(passwordEncoder.encode(request.getCompanyPassword()))
                .role(Role.USER)
                .name(request.getCompanyName())
                .build();

        userRepository.save(user);
        companyRepository.save(company);
        CompanyResponse companyResponse =CompanyResponse.builder()
                .company(company)
                .user(user)
                .build();
        RestDto restResponse = RestDto.builder()
                .data(companyResponse)
                .message("儲存成功")
                .build();
        return restResponse;


    }

    public Object teacherRegister(TeacherRegisterCategory request) {
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
                .name(request.getTeacherName())
                .build();

        userRepository.save(user);
        teacherRepository.save(teacher);
        TeacherResponse teacherResponse =TeacherResponse.builder()
                .teacher(teacher)
                .user(user)
                .build();
        RestDto restResponse = RestDto.builder()
                .data(teacherResponse)
                .message("儲存成功")
                .build();
        return restResponse;

    }

    public Object sendEmail(String email) {
        String  random    = getValidRandom();
        if(!userRepository.findByEmail(email).isEmpty()){
            throw  new MailException("email被使用");
        }
        try {
            sendEmail(email,random);
        }catch (MailException E){
            return "email 錯誤";
        }
        RestDto restResponse = RestDto.builder()
                .data(random)
                .message("亂數創造")
                .build();
        return restResponse;

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
    private Student studentBuilder(StudentRegisterCategory request){
        String studentId = getId(userRepository,"Student");
        var student = Student.builder()
                .studentId(studentId)
                .studentName(request.getStudentName())
                .studentUsername(request.getStudentUsername())
                .studentEmail(request.getStudentEmail())
                .studentPassword(passwordEncoder.encode(request.getStudentPassword()))
                .studentNumber(request.getStudentNumber())
                .pccuId(request.getPccuId())
                .studentCreateTime(LocalDate.now())
                .build();
        return student;
    }
    private Company companyBuilder(CompanyRegisterCategory request){
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
                .companyCreateTime(LocalDate.now())
                .build();
        return company;
    }
    private Teacher teacherBuilder(TeacherRegisterCategory request){
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
            messageHelper.setFrom(MikeEmail.email.myEmail.toString());
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
