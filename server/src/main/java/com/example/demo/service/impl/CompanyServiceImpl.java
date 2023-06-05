package com.example.demo.service.impl;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.category.VacanciesWatchTypeCategory;
import com.example.demo.dao.*;
import com.example.demo.dao.company.CompanyDao;
import com.example.demo.dao.vacancies.VacanciesCountyRepository;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dao.vacancies.VacanciesSkillRepository;
import com.example.demo.dto.CompanyDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.CompanyVacanciesDto;
import com.example.demo.dto.vacancies.PageVacanciesDto;
import com.example.demo.dto.vacancies.VacanciesDto;
import com.example.demo.model.Company;
import com.example.demo.model.TeacherFile;
import com.example.demo.model.User;
import com.example.demo.model.vacancies.*;
import com.example.demo.service.CompanyService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
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
    private final CountyRepository countyRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final CompanyDao companyDao;
    private final VacanciesDao vacanciesDao;
    public static final String NOT_CHECK = "審核中";
    private final TeacherDao teacherDao;
    private final TeacherFileRepository teacherFileRepository;
    @Override
    public Object createVacancies(String companyName,VacanciesCategory vacanciesCategory) {
        String vacanciesId = getId(vacanciesRepository,"V",1);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd");
        LocalDate localDate = LocalDate.now();
        Company company =companyRepository.findByCompanyName(companyName).orElseThrow(()-> new RuntimeException("每有此公司"));
        Vacancies vacancies = Vacancies.builder()
                .vacanciesId(vacanciesId)
                .companyId(company.getCompanyId())
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
                .applyCount(0)
                .vacanciesQuantity(vacanciesCategory.getVacanciesQuantity())
                .vacanciesView(0)
                .teacherValidType(NOT_CHECK)
                .vacanciesCondition(vacanciesCategory.getVacanciesCondition())
                .vacanciesWatchType(vacanciesCategory.getVacanciesWatchType())
                .vacanciesUpdateTime(LocalDate.now())
                .build();
        for(int i = 0;i < (vacanciesCategory.getCounty().size());i++){
            VacanciesCountyId vacanciesCountyId = VacanciesCountyId.builder()
                    .vacanciesId(vacanciesId)
                    .countyId(vacanciesCategory.getCounty().get(i))
                    .build();
            VacanciesCounty vacanciesCounty =VacanciesCounty.builder()
                    .vacanciesCountyId(vacanciesCountyId)
                    .build();
            vacanciesCountyRepository.save(vacanciesCounty);
        }
        for(int i = 0;i < (vacanciesCategory.getSkill().size());i++){
            VacanciesSkillId vacanciesSkillId =VacanciesSkillId.builder()
                    .vacanciesId(vacanciesId)
                    .skillId(vacanciesCategory.getSkill().get(i))
                    .build();
            VacanciesSkill vacanciesSkill = VacanciesSkill.builder()
                            .vacanciesSkillId(vacanciesSkillId)
                            .build();
            System.out.println(vacanciesSkill);
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
    public Object findVacanciesByCompanyName(String companyName,int page,int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<CompanyVacanciesDto> companyVacanciesDtos = companyDao.getCompanyVacanciesByCompanyName(companyName,selectLimit,selectOffset);
        Integer total = companyDao.getCompanyVacanciesCount(companyName);
        System.out.println(companyVacanciesDtos);
        PageVacanciesDto pageVacanciesDto =PageVacanciesDto.builder()
                .companyVacanciesDto(companyVacanciesDtos)
                .page(page)
                .size(limit)
                .total(total)
                .build();
        RestDto restDto = RestDto.builder()
                .message("查詢成功")
                .data(pageVacanciesDto)
                .build();
        return restDto;
        //        PageVacanciesDto pageVacanciesDto = PageVacanciesDto.builder()
//                .companyId( )
//                .companyName()
//                .companyImage_Url()
//                .vacanciesId()W
//                .teacherId()
//                .vacanciesName()
//                .vacanciesTime()
//                .vacanciesDescription()
//                .vacanciesRequirement()
//                .vacanciesWorkExperience()
//                .vacanciesEducation()
//                .vacanciesDepartment()
//                .vacanciesQuantity()
//                .vacanciesCreateTime()
//                .vacanciesEndTime()
//                .applyCount()
//                .vacanciesView()
//                .vacanciesDownSalary()
//                .vacanciesTopSalary()
//                .vacanciesSalaryType()
//                .skills()
//                .counties()
//                .build();
//    return pageVacanciesDto;
    }

    @Override
    public Object updateVacancies(String companyName, String vacanciesId, VacanciesCategory vacanciesCategory) {
        Vacancies selectVacancies =vacanciesRepository.findById(vacanciesId).orElseThrow(() -> new RuntimeException("vacanciesId:找不到職缺"));
        Vacancies vacancies = Vacancies.builder()
                .vacanciesId(vacanciesId)
                .companyId(selectVacancies.getCompanyId())
                .vacanciesName(vacanciesCategory.getVacanciesName())
                .vacanciesTime(vacanciesCategory.getVacanciesTime())
                .vacanciesWorkExperience(vacanciesCategory.getVacanciesWorkExperience())
                .vacanciesEducation(vacanciesCategory.getVacanciesEducation())
                .vacanciesDepartment(vacanciesCategory.getVacanciesDepartment())
                .vacanciesOther(vacanciesCategory.getVacanciesOther())
                .vacanciesSafe(vacanciesCategory.getVacanciesSafe())
                .vacanciesCreateTime(selectVacancies.getVacanciesCreateTime())
                .vacanciesDistrict(vacanciesCategory.getVacanciesDistrict())
                .vacanciesAddress(vacanciesCategory.getVacanciesAddress())
                .vacanciesSalaryType(vacanciesCategory.getVacanciesSalaryType())
                .vacanciesTopSalary(vacanciesCategory.getVacanciesTopSalary())
                .vacanciesDownSalary(vacanciesCategory.getVacanciesDownSalary())
                .vacanciesDescription(vacanciesCategory.getVacanciesDescription())
                .vacanciesRequirement(vacanciesCategory.getVacanciesRequirement())
                .applyCount(selectVacancies.getApplyCount())
                .vacanciesQuantity(vacanciesCategory.getVacanciesQuantity())
                .vacanciesView(selectVacancies.getVacanciesView())
                .teacherValidType(NOT_CHECK)
                .vacanciesCondition(vacanciesCategory.getVacanciesCondition())
                .vacanciesWatchType(vacanciesCategory.getVacanciesWatchType())
                .vacanciesUpdateTime(LocalDate.now())
                .build();
        vacanciesRepository.save(vacancies);
        vacanciesSkillRepository.deleteByVacanciesId(vacanciesId);
        vacanciesCountyRepository.deleteByVacanciesId(vacanciesId);

        for(int i = 0;i < (vacanciesCategory.getCounty().size());i++){
            VacanciesCountyId vacanciesCountyId = VacanciesCountyId.builder()
                    .vacanciesId(vacanciesId)
                    .countyId(vacanciesCategory.getCounty().get(i))
                    .build();
            VacanciesCounty vacanciesCounty =VacanciesCounty.builder()
                    .vacanciesCountyId(vacanciesCountyId)
                    .build();
            vacanciesCountyRepository.save(vacanciesCounty);
        }
        for(int i = 0;i < (vacanciesCategory.getSkill().size());i++){
            VacanciesSkillId vacanciesSkillId =VacanciesSkillId.builder()
                    .vacanciesId(vacanciesId)
                    .skillId(vacanciesCategory.getSkill().get(i))
                    .build();
            VacanciesSkill vacanciesSkill = VacanciesSkill.builder()
                    .vacanciesSkillId(vacanciesSkillId)
                    .build();
            System.out.println(vacanciesSkill);
            vacanciesSkillRepository.save(vacanciesSkill);
        }
        VacanciesDto vacanciesDto =VacanciesDto.builder()
                .county(vacanciesCategory.getCounty())
                .vacancies(vacancies)
                .skills(vacanciesCategory.getSkill())
                .build();
        RestDto restDto = RestDto.builder()
                .data(vacanciesDto)
                .message("更新成功")
                .build();
        return restDto;
    }
    @Transactional
    @Modifying
    @Override
    public Object deleteVacancies(String companyName, String vacanciesId) {
        vacanciesRepository.deleteById(vacanciesId);
        vacanciesSkillRepository.deleteByVacanciesId(vacanciesId);
        vacanciesCountyRepository.deleteByVacanciesId(vacanciesId);
        RestDto restDto = RestDto.builder()
                .data(vacanciesId)
                .message("vacanciesId刪除成功")
                .build();
        return restDto;

    }

    @Override
    public Object findCompanyByCompanyName(String companyName) {
        Company company = companyRepository.findByCompanyName(companyName).orElseThrow(()-> new RuntimeException("沒有此職缺"));
        User user = userRepository.findById(company.getCompanyId()).orElseThrow(()-> new RuntimeException("沒有此使用者"));
        CompanyDto companyDto = CompanyDto.builder()
                .companyId(company.getCompanyId())
                .companyName(company.getCompanyName())
                .companyImageUrl(company.getCompanyImageUrl())
                .companyEmail(company.getCompanyEmail())
                .companyAddress(company.getCompanyAddress())
                .companyCounty(company.getCompanyCounty())
                .companyDistrict(company.getCompanyDistrict())
                .companyNumber(company.getCompanyNumber())
                .companyTitle(company.getCompanyTitle())
                .companyUsername(company.getCompanyUsername())
                .role(user.getRole().toString())
                .build();
        RestDto restDto = RestDto.builder()
                .data(companyDto)
                .message("查詢成功")
                .build();
        return  restDto;
    }



    @Override
    public Object updateVacanciesWatchType(String vacanciesId, VacanciesWatchTypeCategory vacanciesWatchTypeCategory) {
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("沒有此職缺"));
        vacancies.setVacanciesWatchType(vacanciesWatchTypeCategory.getWatchType());
        vacancies.setVacanciesUpdateTime(LocalDate.now());
        System.out.println(vacanciesWatchTypeCategory.getWatchType());
        vacanciesRepository.save(vacancies);
        RestDto restDto = RestDto.builder()
                .data(vacancies)
                .message("更新成功")
                .build();
        return  restDto;
    }

    @Override
    public Object findTeacherFileForm(String fileType, int page, int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<TeacherFile> teacherFiles = teacherDao.findByFileType(fileType, selectLimit, selectOffset);
        RestDto restDto = getRestDto(teacherFiles,"查詢成功");
        return restDto;
    }

    @Override
    public ResponseEntity<Object> downloadTeacherFile(String companyName, String teacherFileId, HttpServletResponse response) {
        TeacherFile teacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("沒有此檔案"));
        String filePath = teacherFile.getTeacherFilePath();
        String filename  = filePath.substring(filePath.lastIndexOf("\\"));
        File file = new File(filePath);
        FileSystemResource resource = new FileSystemResource(file);

        if (resource.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
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
