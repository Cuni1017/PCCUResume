package com.example.demo.service.impl;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.vacancies.VacanciesCountyRepository;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dao.vacancies.VacanciesSkillRepository;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.vacancies.VacanciesDto;
import com.example.demo.model.County;
import com.example.demo.model.Skill;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.model.vacancies.VacanciesCounty;
import com.example.demo.model.vacancies.VacanciesSkill;
import com.example.demo.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final VacanciesRepository vacanciesRepository;
    private final VacanciesCountyRepository vacanciesCountyRepository;
    private final VacanciesSkillRepository vacanciesSkillRepository;
    public static final String NOT_CHECK = "尚未審核";
    @Override
    public Object createVacancies(String companyId,VacanciesCategory vacanciesCategory) {
        String vacanciesId = getId(vacanciesCountyRepository,"V",1);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd");
        LocalDate localDate = LocalDate.now();
        Vacancies vacancies = Vacancies.builder()
                .id(vacanciesId)
                .companyId(companyId)
                .vacanciesName(vacanciesCategory.getVacanciesName())
                .vacanciesTime(vacanciesCategory.getVacanciesTime())
                .vacanciesWorkExperience(vacanciesCategory.getVacanciesWorkExperience())
                .vacanciesEducation(vacanciesCategory.getVacanciesEducation())
                .vacanciesDepartment(vacanciesCategory.getVacanciesDepartment())
                .vacanciesOther(vacanciesCategory.getVacanciesOther())
                .vacanciesSafe(vacanciesCategory.getVacanciesSafe())
                .vacanciesCreateTime(localDate)
                .vacanciesDistrict(vacanciesCategory.getVacanciesDistrict())
                .vacanciesAddress(vacanciesCategory.getVacanciesAddress())
                .vacanciesSalaryType(vacanciesCategory.getVacanciesSalaryType())
                .vacanciesTopSalary(vacanciesCategory.getVacanciesTopSalary())
                .vacanciesDownSalary(vacanciesCategory.getVacanciesDownSalary())
                .vacanciesDescription(vacanciesCategory.getVacanciesDescription())
                .vacanciesRequirement(vacanciesCategory.getVacanciesRequirement())
                .applyCount(vacanciesCategory.getApplyCount())
                .vacanciesQuantity(vacanciesCategory.getVacanciesQuantity())
                .vacanciesView(vacanciesCategory.getVacanciesView())
                .teacherValidType(NOT_CHECK)
                .vacanciesCondition(vacanciesCategory.getVacancies_condition())
                .build();
        for(int i = 0;i < (vacanciesCategory.getCounty().size());i++){
            VacanciesCounty vacanciesCounty =VacanciesCounty.builder()
                    .countyId(vacanciesCategory.getCounty().get(i))
                    .vacanciesId(vacanciesId)
                    .build();
            vacanciesCountyRepository.save(vacanciesCounty);
        }
        for(int i = 0;i < (vacanciesCategory.getSkill().size());i++){
            VacanciesSkill vacanciesSkill = VacanciesSkill.builder()
                            .vacanciesId(vacanciesId)
                            .skillId(vacanciesCategory.getSkill().get(i))
                            .build();
            vacanciesSkillRepository.save(vacanciesSkill);
        }
        vacanciesRepository.save(vacancies);
        VacanciesDto vacanciesDto =VacanciesDto.builder()
                .county(vacanciesCategory.getCounty())
                .vacancies(vacancies)
                .skills(vacanciesCategory.getSkill())
                .build();
        RestDto restDto = RestDto.builder()
                .data(vacanciesDto)
                .message("新增成功")
                .build();
        return restDto;
    }

    @Override
    public Object getVacanciesSkillAndCounty(String companyId) {
        List<County> counties = .findAll();
    }

    private String getId(JpaRepository repository , String idType , int x){
        long userCount = repository.count();
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMdd");
        String today =ft.format(dNow);
        int intToday = Integer.valueOf(today);
        intToday *=100;
        intToday +=userCount;
        idType = idType.substring(0,x);
        String studentId = idType + intToday;
        return studentId;
    }
}
