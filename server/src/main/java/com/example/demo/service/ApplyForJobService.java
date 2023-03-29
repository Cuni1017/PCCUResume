package com.example.demo.service;

import com.example.demo.category.ApplyCategory;

public interface ApplyForJobService {
    Object findUserResume(String userId, String vacanciesId);

    Object createApply(String userId,String companyId, String resumeId,  String vacanciesId, ApplyCategory applyCategory);
}
