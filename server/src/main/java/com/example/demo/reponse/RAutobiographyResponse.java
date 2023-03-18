package com.example.demo.reponse;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RAutobiographyResponse {
    private String id;

    private String userId;

    private String resumeId;

    private String chineseAutobiography;

    private String englishAutobiography;
}
