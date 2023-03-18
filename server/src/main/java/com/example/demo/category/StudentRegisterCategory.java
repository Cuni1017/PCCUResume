package com.example.demo.category;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class StudentRegisterCategory {

  @NotBlank(message = "帳號沒塡")

  private String studentUsername;
  @NotBlank(message = "密碼沒塡")
  private String studentPassword;
  @NotBlank(message = "名字沒塡")
  private String studentName;
  @NotBlank(message = "EMAIL沒塡")
  private String studentEmail;
  @NotBlank(message = "電話號碼沒塡")
  private String studentNumber;
  @NotBlank(message = "學號沒塡")

  private String pccuId;

}
