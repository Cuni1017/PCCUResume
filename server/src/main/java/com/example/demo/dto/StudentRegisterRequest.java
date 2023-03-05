package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentRegisterRequest {

  private String studentUsername;
  private String studentPassword;
  private String studentName;
  private String studentEmail;

  private String pccuId;

}
