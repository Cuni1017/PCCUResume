package com.example.demo.auth;


import com.example.demo.config.JwtService;
import com.example.demo.error.userNotFoundException;
import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import com.example.demo.token.TokenType;
import com.example.demo.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository userRepository;
  private final StudentRepository studentRepository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  private Student studentBuilder(RegisterRequest request){
    String studentId = getStudentId();
    var student = Student.builder()
            .student_id(studentId)
            .student_name(request.getStudentName())
            .student_username(request.getStudentUsername())
            .student_email(request.getStudentEmail())
            .student_password(passwordEncoder.encode(request.getStudentPassword()))
            .build();
    return student;
  }
  private User userBuilder(RegisterRequest request){
    String studentId = getStudentId();
    var user = User.builder()
            .id(studentId)
            .username(request.getStudentUsername())
            .email(request.getStudentEmail())
            .password(passwordEncoder.encode(request.getStudentPassword()))
            .role(Role.USER)
            .build();
    return user;
  }
//  public AuthenticationResponse register(RegisterRequest request) {
//    String studentId = getStudentId();
//    var user = User.builder()
//        .firstname(request.getFirstname())
//        .lastname(request.getLastname())
//        .email(request.getEmail())
//        .password(passwordEncoder.encode(request.getPassword()))
//        .role(Role.USER)
//        .build();
//    var savedUser = userRepository.save(user);
//    var jwtToken = jwtService.generateToken(user);
//    saveUserToken(savedUser, jwtToken);
//    return AuthenticationResponse.builder()
//        .token(jwtToken)
//        .build();
//  }
public User register(RegisterRequest request) {

    if(!userRepository.findByUsername(request.getStudentUsername()).isEmpty()){
       throw  new userNotFoundException("這帳號被註冊過了");
    }
    var student = studentBuilder(request);
    var user    = userBuilder(request);
    var savedUser = userRepository.save(user);
    var savedStudent = studentRepository.save(student);
//  var jwtToken = jwtService.generateToken(user);
//  saveUserToken(savedUser, jwtToken);
  return user;
}
    public User sendEmail(RegisterRequest request) {

        var student = studentBuilder(request);
        var user    = userBuilder(request);
        var savedUser = userRepository.save(user);
        var savedStudent = studentRepository.save(student);
//  var jwtToken = jwtService.generateToken(user);
//  saveUserToken(savedUser, jwtToken);
        return user;
    }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = userRepository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
  }
  public AuthenticationResponse login(AuthenticationRequest request) {

    User user_data = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new userNotFoundException("查無帳號"));
    BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
    boolean isPasswordMatche = bcryptPasswordEncoder.matches(request.getPassword(),user_data.getPassword());

    if(request.getUsername().equals(user_data.getUsername())){
      if(isPasswordMatche){
        var jwtToken = jwtService.generateToken(user_data);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
      }else{
          throw new userNotFoundException("密碼錯誤");
      }
    }else{
      throw new userNotFoundException("帳號錯誤");
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
  private String getStudentId(){
      long userCount = studentRepository.count();
      Date dNow = new Date( );
      SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMdd");
      String today =ft.format(dNow);
      int intToday = Integer.valueOf(today);
      intToday *= 10000000;
      intToday +=userCount;
      String studentId = "C" + intToday;
      return studentId;
  }


}
