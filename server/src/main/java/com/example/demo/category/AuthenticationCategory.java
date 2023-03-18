package com.example.demo.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationCategory {

  @NotBlank(message = "帳號不得為空")
  private String username;
  @NotBlank(message = "密碼不得為空")
  private String password;
}
