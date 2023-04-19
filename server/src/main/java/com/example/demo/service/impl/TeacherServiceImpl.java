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
import com.example.demo.dto.CompanyVacanciesDto;
import com.example.demo.dto.NewsDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.dto.vacancies.PageVacanciesDto;
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
    public Object findNewsById() {
        LocalDate beforeFiveDay = LocalDate.now().minusDays(5);
        List<Student> students      = studentRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.STUDENT_USER.toString());
        List<Company> companies     = companyRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.COMPANY_USER.toString());
        List<Vacancies> vacancies = vacanciesRepository.findByVacanciesUpdateTimeAfterAndTeacherValidType(beforeFiveDay, TeacherValidType.審核中.toString());
        List<String> vacanciesIds = applyDao.findApplyVacanciesIdByUpdateTime(beforeFiveDay);

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
        return  getRestDto(newsDto,"查詢成功");
    }



    @Override
    public Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory) {
        User user = updateRole(studentId,teacherId,roleCategory);
        return getRestDto(user,"更新成功");
    }

    @Override
    public Object findStudentByRole(int page , int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<Student> students = studentRepository.findByRole(Role.STUDENT_USER.toString(),selectLimit,selectOffset);
        return getRestDto(students,"查詢成功");
    }

    @Override
    public Object findCompanyByRole(int page , int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<Company> companies = companyRepository.findByRole(Role.COMPANY_USER.toString(),selectLimit,selectOffset);
        return getRestDto(companies,"查詢成功");
    }

    @Override
    public Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory) {
        User user = updateRole(companyId,teacherId,roleCategory);
        return getRestDto(user,"更新成功");
    }

    @Override
    public Object findVacanciesByTeacherValidType(int page , int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<CompanyVacanciesDto> companyVacanciesDtos = vacanciesDao.findPageVacanciesReview(selectLimit,selectOffset);
        long total = companyVacanciesDtos.stream().count();
        int intTotal = (int)total;
        PageVacanciesDto pageVacanciesDto = PageVacanciesDto.builder()
                .companyVacanciesDto(companyVacanciesDtos)
                .page(page)
                .size(limit)
                .total(intTotal)
                .build();
        return getRestDto(pageVacanciesDto,"查詢成功");
    }

    @Override
    public Object UpdateVacanciesByTeacherValidType(String teacherId, String vacanciesId, TeacherValidType teacherValidType) {
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("沒有此職缺"));
        vacancies.setTeacherValidType(teacherValidType.toString());
        vacancies.setTeacherId(teacherId);
        vacanciesRepository.save(vacancies);
        return getRestDto(vacancies,"更新成功");
    }

    @Override
    public Object findApply(String teacherId, int page, int limit) {
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
    private int getSelectOffset(int page,int limit){
        return (page-1)*limit;
    }
    private int getSelectLimit(int page,int limit){
        return page*limit;
    }
}
