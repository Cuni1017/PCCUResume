package com.example.demo.service;

import com.example.demo.dao.*;
import com.example.demo.dto.*;
import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.dto.vacancies.LoginStudentDto;
import com.example.demo.model.*;
import com.example.demo.category.AuthenticationCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final TeacherRepository teacherRepository;
    private final TokenRepository tokenRepository;

    public RestDto login(AuthenticationCategory request) {
        User user_data = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UserNotFoundException("查無帳號"));
        BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
        boolean isPasswordMatche = bcryptPasswordEncoder.matches(request.getPassword(), user_data.getPassword());
        if (request.getUsername().equals(user_data.getUsername())) {
            if (isPasswordMatche) {
                var jwtToken = jwtService.generateToken(user_data);
                saveUserToken(user_data, jwtToken);
                String userId = user_data.getId();
                AuthenticationDto authenticationDto =AuthenticationDto.builder()
                        .token(jwtToken)
                        .build();
                if(userId.startsWith("C")){
                    Company company = companyRepository.findById(userId).orElseThrow(()->new RuntimeException("沒有此公司"));
                    LoginCompanyDto loginCompanyDto = LoginCompanyDto.builder()
                            .companyId(company.getCompanyId())
                            .companyName(company.getCompanyName())
                            .companyUsername(company.getCompanyUsername())
                            .companyValidType(company.getCompanyValidType())
                            .companyImageUrl(company.getCompanyImageUrl())
                            .role(user_data.getRole().toString())
                            .build();
                    LoginDto loginDto=LoginDto.builder()
                            .object(loginCompanyDto)
                            .authenticationDto(authenticationDto)
                            .build();
                    RestDto restDto  =RestDto.builder()
                            .data(loginDto)
                            .message("登入成功")
                            .build();
                    return  restDto;
                } else if (userId.startsWith("S")) {
                    Student student = studentRepository.findById(userId).orElseThrow(()->new RuntimeException("沒有此學生"));
                    LoginStudentDto loginStudentDto = LoginStudentDto.builder()
                            .studentId(student.getStudentId())
                            .studentImageUrl(student.getStudentImageUrl())
                            .studentName(student.getStudentName())
                            .studentUsername(student.getStudentUsername())
                            .role(user_data.getRole().toString())
                            .pccuId(student.getPccuId())
                            .build();
                    LoginDto loginDto=LoginDto.builder()
                            .object(loginStudentDto)
                            .authenticationDto(authenticationDto)
                            .build();
                    RestDto restDto  =RestDto.builder()
                            .data(loginDto)
                            .message("登入成功")
                            .build();
                    return  restDto;
                } else if (userId.startsWith("T")) {
                    Teacher teacher = teacherRepository.findById(userId).orElseThrow(()->new RuntimeException("沒有此教師"));
                    LoginTeacherDto loginTeacherDto = LoginTeacherDto.builder()
                            .teacherId(teacher.getTeacherId())
                            .teacherName(teacher.getTeacherName())
                            .teacherUsername(teacher.getTeacherUsername())
                            .teacherEmail(teacher.getTeacherUsername())
                            .role(user_data.getRole().toString())
                            .build();
                    LoginDto loginDto=LoginDto.builder()
                            .object(loginTeacherDto)
                            .authenticationDto(authenticationDto)
                            .build();
                    RestDto restDto  =RestDto.builder()
                            .data(loginDto)
                            .message("登入成功")
                            .build();
                    return  restDto;
                }else{
                    RestDto restDto  =RestDto.builder()
                            .data(null)
                            .message("超級帳號登入")
                            .build();
                    return  restDto;

                }


            } else {
                throw new UserNotFoundException("密碼錯誤");
            }
        } else {
            throw new UserNotFoundException("帳號錯誤");
        }
    }
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
