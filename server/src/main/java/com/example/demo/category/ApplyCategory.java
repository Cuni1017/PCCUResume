package com.example.demo.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplyCategory {

    private String applyBeforeTalk;
    private int applyNumber;
    private String applyEmail;
}
