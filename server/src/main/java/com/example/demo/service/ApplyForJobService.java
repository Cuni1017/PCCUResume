package com.example.demo.service;

import com.example.demo.category.ApplyCategory;

public interface ApplyForJobService extends BasicService{
    Object findUserResume(String studentName, String vacanciesId);

    Object createApply(String userId,String companyId, String resumeId,  String vacanciesId, ApplyCategory applyCategory);

    Object findUserApply(String studentId);

    Object createUserLike(String studentUserName, String vacanciesId);

    Object deleteUserLike(String studentUserName,String userLikeId);

    Object findUserLike(String studentUserName);
}
