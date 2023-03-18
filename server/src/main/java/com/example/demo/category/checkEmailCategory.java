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
<<<<<<< HEAD:server/src/main/java/com/example/demo/category/checkEmailCategory.java
public class checkEmailCategory {
=======
public class checkEmailDto {
    @NotBlank(message = "正確驗整碼並無傳送")
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00:server/src/main/java/com/example/demo/dto/checkEmailDto.java
    private String validMsg;
    @NotBlank(message = "驗整碼並無傳送")
    private String inputMsg;
}
