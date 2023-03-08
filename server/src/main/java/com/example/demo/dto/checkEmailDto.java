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
public class checkEmailDto {
    @NotBlank(message = "正確驗整碼並無傳送")
    private String validMsg;
    @NotBlank(message = "驗整碼並無傳送")
    private String inputMsg;
}
