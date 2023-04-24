package com.example.demo.service;

import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.category.RoleCategory;
import com.example.demo.category.resume.post.SearchCategory;
import com.example.demo.model.TeacherValidType;

public interface TeacherService {
    Object findNewsById();


    Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory);

    Object findStudentByRole(int page , int limit);

    Object findCompanyByRole(int page , int limit);

    Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory);

    Object findVacanciesByTeacherValidType(int page , int limit, SearchCategory searchCategory);


    Object UpdateVacanciesByTeacherValidType(String teacherId, String vacanciesId, TeacherValidType teacherValidType);

    Object findApply(String teacherId, ChangeApplyTypeCategory changeApplyTypeCategory,int page,int limit);

    Object findById(String teacherId);

    Object updateApply(String teacherId, String applyId,ChangeApplyTypeCategory changeApplyTypeCategory);

    Object deleteCompanyByRole(String teacherId, String companyId);

    Object deleteStudentRole(String teacherId, String studentId);
}
