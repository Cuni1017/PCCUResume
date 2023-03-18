package com.example.demo.service.impl;

//import com.example.demo.dao.vacancies.VacanciesSpecification;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.dao.CountyRepository;
import com.example.demo.dao.SkillRepository;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.vacancies.FindVacanciesDto;
import com.example.demo.dto.RestDto;
import com.example.demo.service.VacanciesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VacanciesServiceImpl implements VacanciesService {

    private final VacanciesRepository vacanciesRepository;
    private final SkillRepository skillRepository;
    private final CountyRepository countyRepository;

    @Override
    public Object findAll(List<String> technology, String order, List<String> county, String salaryType, Long salaryMax, int salaryMin, int page, int limit) {
        List<String> skills = findSkillName();
        List<String> counties = findCountyName();
        if(technology == null){
            technology = skills;
        }
        if(county == null){
            county = counties;
        }
        System.out.println("county:"+county);
        System.out.println("technology:"+technology);
        Pageable pageable = PageRequest.of(page -1 , limit, Sort.by("vacancies_id"));
        Page<Object> pageVacancies=vacanciesRepository.findPageVacancies(county,technology,salaryMin,salaryMax,salaryType,pageable);
        FindVacanciesDto findVacanciesDto =FindVacanciesDto.builder()
                .technology(skills)
                .county(counties)
                .PageVacancies(pageVacancies)
                .build();
        RestDto restResponse = RestDto.builder()
                .data(findVacanciesDto)
                .message("查詢成功")
                .build();
        return restResponse;
    }

    @Override
    public Object findSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Object findCounties() {
        return countyRepository.findAll();
    }


    private List<String> findSkillName(){
        return  skillRepository.findSkillName();

    }
    private List<String> findCountyName(){
        return  countyRepository.findCountyName();

    }

//        if(county != null){
//            county = " v.vacancies_county = " + "'"+county + "'";
//        }else{
//            county = "1=1";
//        }
//        return vacanciesDao.getPageVacancies(technology,  order,  county, salaryType, salaryMax, salaryMin,page,limit);
//        System.out.println("county1:"+county);
//        System.out.println("檢查"+technology);
//        System.out.println("檢查"+technology1);
//        System.out.println("檢查"+county1);
//        System.out.println("檢查"+salaryType);
//        System.out.println("檢查"+salaryMax);
//        System.out.println("檢查"+salaryMin);
//        Pageable pageable = PageRequest.of(page -1 , limit, Sort.by("vacancies_id"));
//String county3 = null;



//    public Object findAll(List<String> technology, String order, VacanciesCounty county,String salaryType, int salaryMax, int salaryMin, int page, int limit) {
//
//        System.out.println("service order"+order);
//        String T = technology.stream()
//                .map(value->"column LIKE '%" + value + "%'")
//                .collect(Collectors.joining(" OR "));

//        VacanciesSpecification vacanciesSpecification1 = new VacanciesSpecification(technology,  order, county,salaryType  , salaryMax,  salaryMin, page, limit);
//
//        System.out.println(vacanciesSpecification1);
//        Pageable pageable = vacanciesSpecification1.getPage();
//        System.out.println(pageable);
//        Page<Vacancies> vacancies = vacanciesRepository.findAll(vacanciesSpecification1,pageable);
//        System.out.println(vacancies.getContent());
//        return vacancies;

    }
//
//

