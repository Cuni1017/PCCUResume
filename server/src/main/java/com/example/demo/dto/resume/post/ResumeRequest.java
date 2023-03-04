package com.example.demo.dto.resume.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ResumeRequest {

    private int number;
    private String name;
    @JsonProperty(value="rWorkHopeRequest")
    private RWorkHopeRequest rWorkHopeRequest;
}
