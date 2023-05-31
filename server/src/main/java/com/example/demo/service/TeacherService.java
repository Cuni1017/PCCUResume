package com.example.demo.service;

import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.category.RoleCategory;
import com.example.demo.category.TeacherFileCategory;
import com.example.demo.category.TeacherValidTypeCategory;
import com.example.demo.category.resume.post.SearchCategory;
import com.example.demo.model.TeacherValidType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

public interface TeacherService {
    Object findNewsById();


    Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory);

    Object findStudentByRole(int page , int limit,String search);

    Object findCompanyByRole(int page , int limit,String search);

    Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory);

    Object findVacanciesByTeacherValidType(int page , int limit, String search);


    Object UpdateVacanciesByTeacherValidType(String teacherId, String vacanciesId, TeacherValidTypeCategory teacherValidTypeCategory);

    Object findApply( String changeApplyType,int page,int limit);

    Object findById(String teacherId);

    Object updateApply(String teacherId, String applyId,ChangeApplyTypeCategory changeApplyTypeCategory);

    Object deleteCompanyByRole(String teacherId, String companyId);

    Object deleteStudentRole(String teacherId, String studentId);

    Object findStudentCheckByRole(int page, int limit,String search);

    Object findCompanyCheckByRole(int page, int limit,String search);

    Object findVacanciesCheckByTeacherValidType(int page, int limit, String search);

    Object findTeacherFile(String fileType, int page, int limit);

    Object createTeacherFile(TeacherFileCategory teacherFileCategory, String teacherId);

    Object uploadTeacherFile(MultipartFile uploadFile, String teacherId, HttpServletRequest httpServletRequest);

    Object uploadUpdateTeacherFile(MultipartFile uploadFile, String teacherId, String teacherFileId, HttpServletRequest httpServletRequest);

    Object updateTeacherFile(TeacherFileCategory teacherFileCategory, String teacherId, String teacherFileId);

    Object deleteTeacherFile(String teacherId, String teacherFileId);
}
