package com.example.demo.category.resume.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RAutobiographyRequest {
    public String chineseAutobiography;

    public String englishAutobiography;
}
