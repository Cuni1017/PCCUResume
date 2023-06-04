package com.example.demo.service;

import com.example.demo.category.*;
import com.example.demo.category.resume.post.SearchCategory;
import com.example.demo.model.TeacherValidType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
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

    Object findTeacherFileForm(String fileType, int page, int limit);

    Object createTeacherFileForm(TeacherFileCategory teacherFileCategory, String teacherId);

    Object uploadTeacherFile(MultipartFile uploadFile, String teacherId, HttpServletRequest httpServletRequest);

    Object uploadUpdateTeacherFile(MultipartFile uploadFile, String teacherId, String teacherFileId, HttpServletRequest httpServletRequest);

    Object updateTeacherFileForm(TeacherFileCategory teacherFileCategory, String teacherId, String teacherFileId);

    Object deleteTeacherFileForm(String teacherId, String teacherFileId);

    ResponseEntity<Object> downloadTeacherFile(String teacherId, String teacherFileId, HttpServletResponse response );

    Object deleteTeacherFile(String teacherId, String teacherFileId);

    Object updateApplyTime(String applyId, ApplyTimeCategory applyTimeCategory);
}
