package com.example.demo.service.impl;

import com.example.demo.category.RoleCategory;
import com.example.demo.dao.ApplyRepository;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.ApplyUserDto;
import com.example.demo.dto.NewsDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.dto.vacancies.VacanciesDto;
import com.example.demo.model.*;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final ApplyRepository applyRepository;
    private final CompanyRepository companyRepository;
    private final VacanciesRepository vacanciesRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final ApplyDao applyDao;
    private final VacanciesDao vacanciesDao ;
    @Override
    public Object findNewsById(String teacherId) {
        LocalDate beforeFiveDay = LocalDate.now();
        List<Student> students      = studentRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.STUDENT_USER.toString());
        List<Company> companies     = companyRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.COMPANY_USER.toString());
        List<Vacancies> vacancies = vacanciesRepository.findByVacanciesUpdateTimeAfterAndTeacherValidType(beforeFiveDay, TeacherValidType.審核中.toString());
        List<String> vacanciesIds = applyDao.findApplyVacanciesIdByCreateTime(beforeFiveDay);

        List<AllApplyDto> allApplyDtoList = new LinkedList<>();
        vacanciesIds = vacanciesIds.stream().distinct().collect(Collectors.toList());

        for(String vacanciesId : vacanciesIds){
            List<ApplyUserDto> applyUserDto = applyDao.findApplyVacanciesAndUserByVacanciesId(vacanciesId);
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
            AllApplyDto       allApplyDto = AllApplyDto.builder()
                    .fullVacanciesDto(fullVacanciesDto)
                    .ApplyUserDto(applyUserDto)
                    .build();
            allApplyDtoList.add(allApplyDto);
        }
        NewsDto newsDto = NewsDto.builder()
                .allApplyDtoList(allApplyDtoList)
                .students(students)
                .companies(companies)
                .vacancies(vacancies)
                .build();
        return  newsDto;
    }

    @Override
    public Object findStudentReview(String teacherId) {
        List<Student> students = studentRepository.findByRole(Role.STUDENT_USER.toString());
        return getRestDto(students,"查詢成功");
    }

    @Override
    public Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory) {
        User user = updateRole(studentId,teacherId,roleCategory);
        return getRestDto(user,"更新成功");
    }

    @Override
    public Object findStudentByRole() {
        List<Student> students = studentRepository.findByRole(Role.STUDENT_USER.toString());
        return getRestDto(students,"查詢成功");
    }

    @Override
    public Object findCompanyByRole() {
        List<Company> companies = companyRepository.findByRole(Role.COMPANY_USER.toString());
        return getRestDto(companies,"查詢成功");
    }

    @Override
    public Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory) {
        User user = updateRole(companyId,teacherId,roleCategory);
        return getRestDto(user,"更新成功");
    }

    @Override
    public Object findVacanciesByTeacherValidType(String teacherId) {
//        List<CompanyVacanciesDto>
        return null;
    }

    private User updateRole(String userId, String teacherId,RoleCategory roleCategory) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("使用者不存在"));
        if(userId.startsWith("S")){
            user.setRole(roleCategory.getRole());
        }else{
            user.setRole(roleCategory.getRole());
        }
        userRepository.save(user);
        return  user;
    }


    private RestDto getRestDto(Object o, String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }
}
