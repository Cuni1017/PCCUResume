package com.example.demo.dto.resume.post;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RWorkHopeRequest {

    private String type;

    private String date;
}
