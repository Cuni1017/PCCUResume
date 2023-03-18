package com.example.demo.controller;

import com.example.demo.category.CompanyRegisterCategory;
import com.example.demo.category.TeacherRegisterCategory;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.TeacherRepository;
import com.example.demo.service.RegisterService;
import com.example.demo.category.StudentRegisterCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequiredArgsConstructor
public class RegisterController {

  private final RegisterService registerService;
  private final StudentRepository studentRepository;
  private final CompanyRepository companyRepository;
  private final TeacherRepository teacherRepository;

//  @PostMapping("/register")
//  public ResponseEntity<AuthenticationResponse> register(
//      @RequestBody RegisterRequest request
//  ) {
//    return ResponseEntity.ok(service.register(request));
//  }
@GetMapping("/students/test")
public ResponseEntity<String> test1(
) {
  return ResponseEntity.ok("test");
}
  @GetMapping("/register/sendemail/{email}")
  public ResponseEntity<Object> sendEmail(
          @PathVariable String email
  ) {
    return ResponseEntity.ok(registerService.sendEmail(email));
  }
@GetMapping("/register/test")
public ResponseEntity<String> test(
) {
  return ResponseEntity.ok("test");
}
  @PostMapping("/register/student")
  public ResponseEntity<Object> studentRegister(
          @RequestBody StudentRegisterCategory request
  ) {
    return ResponseEntity.ok(registerService.studentRegister(request));
  }
//  @PostMapping("/register/student/{studentId}/checkemail")
//  public ResponseEntity<String> checkStudentEmail(
//          @RequestBody checkEmailDto request,
//          @PathVariable String studentId
//  ) {
//    return ResponseEntity.ok(registerService.checkEmail(studentId,studentRepository,request));
//  }
  @PostMapping("/register/company")
  public ResponseEntity<Object> companyRegister(
          @RequestBody CompanyRegisterCategory request
  ) {
    return ResponseEntity.ok(registerService.companyRegister(request));
  }
//  @PostMapping("/register/company/{companyId}/checkemail")
//  public ResponseEntity<String> checkCompanyEmail(
//          @RequestBody checkEmailDto request,
//          @PathVariable String companyId
//  ) {
//    return ResponseEntity.ok(registerService.checkEmail(companyId,companyRepository,request));
//  }
  @PostMapping("/register/teacher")
  public ResponseEntity<Object> teacherRegister(
          @RequestBody TeacherRegisterCategory request
  ) {
    return ResponseEntity.ok(registerService.teacherRegister(request));
  }
//  @PostMapping("/register/teacher/{teacherId}/checkemail")
//  public ResponseEntity<String> checkTeacherEmail(
//          @RequestBody checkEmailDto request,
//          @PathVariable String teacherId
//  ) {
//    return ResponseEntity.ok(registerService.checkEmail(teacherId,teacherRepository,request));
//  }




}
