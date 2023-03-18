package com.example.demo.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentRegisterCategory {

  private String studentUsername;
  private String studentPassword;
  private String studentName;
  private String studentEmail;
  private String studentNumber;
  private String pccuId;

}
