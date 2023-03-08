package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentRegisterRequest {
  @NotBlank(message = "帳號沒塡")
  private String studentUsername;
  @NotBlank(message = "密碼沒塡")
  private String studentPassword;
  @NotBlank(message = "名字沒塡")
  private String studentName;
  @NotBlank(message = "EMAIL沒塡")
  private String studentEmail;
  @NotBlank(message = "沒塡")
  private String studentNumber;
  private String pccuId;

}
