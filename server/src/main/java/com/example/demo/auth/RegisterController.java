package com.example.demo.auth;

import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class RegisterController {

  private final AuthenticationService service;

//  @PostMapping("/register")
//  public ResponseEntity<AuthenticationResponse> register(
//      @RequestBody RegisterRequest request
//  ) {
//    return ResponseEntity.ok(service.register(request));
//  }
  @PostMapping("/register/student")
  public ResponseEntity<User> register(
          @RequestBody RegisterRequest request
  ) {
    return ResponseEntity.ok(service.register(request));
  }
//  @PostMapping("/register/student/email")
//  public ResponseEntity<User> sendEmail(
//          @RequestBody SendEmailRequest request
//  ) {
//    return ResponseEntity.ok(service.sendEmail(request));
//  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }
  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> login(
          @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.login(request));
  }


}
