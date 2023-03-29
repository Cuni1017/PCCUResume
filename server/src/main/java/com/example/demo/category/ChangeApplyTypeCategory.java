package com.example.demo.category;

import com.example.demo.model.ApplyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeApplyTypeCategory {
    private ApplyType applyType;
}
