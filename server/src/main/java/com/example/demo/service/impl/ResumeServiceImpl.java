package com.example.demo.service.impl;

import com.example.demo.dao.resume.*;
import com.example.demo.dto.resume.post.*;
import com.example.demo.model.resume.*;
import com.example.demo.reponse.ChooseResumeResponse;
import com.example.demo.reponse.RestResponse;
import com.example.demo.reponse.ResumeResponse;
import com.example.demo.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.json.JSONObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final RWorkHopeRepository rWorkHopeRepository;
    private final RSpecialSkillRepository rSpecialSkillRepository;
    private final RLicenseRepository rLicenseRepository;
    private final RProjectAchievementsRepository rProjectAchievementsRepository;
    private final RAutobiographyRepository rAutobiographyRepository;
    private final RWorkExperienceRepository rWorkExperienceRepository;

    @Override
    public Object createBasicResume(ResumeRequest Request,String studentId) {
        String resumeId = getId(resumeRepository , "Resume",1);
        RWorkHope rWorkHope =RWorkHope.builder()
                .resumeId(resumeId)
                .date(Request.getRWorkHopeRequest().getDate())
                .type(Request.getRWorkHopeRequest().getType())
                .userId(studentId)
                .id(resumeId)
                .build();
        Resume resume = Resume.builder()
                .number(Request.getNumber())
                .school(School.中國文化大學)
                .userId(studentId)
                .resumeId(resumeId)
                .name(Request.getName())
                .createTime(LocalDate.now())
                .build();
        System.out.println(resume );
        resumeRepository.save(resume);
        rWorkHopeRepository.save(rWorkHope);
       List<Resume> resumeData =  resumeRepository.findAll();
        System.out.println(resumeData);
        RestResponse restResponse =RestResponse.builder()
                .data(resume)
                .message("創建基本履歷")
                .build();
        return restResponse;
    }

    @Override
    public Object createSpecialSkill(RSpecialSkillRequest request, String studentId, String resumeId) {
        String specialSkillId = getId(rSpecialSkillRepository,"special",2);
        RSpecialSkill rSpecialSkill = RSpecialSkill.builder()
                .resumeId(resumeId)
                .userId(studentId)
                .id(specialSkillId)
                .special(request.special)
                .name(request.name)
                .talk(request.talk)
                .build();
        rSpecialSkillRepository.save(rSpecialSkill);
        RestResponse restResponse =RestResponse.builder()
                .data("沒有資料傳回")
                .message("輸入成功")
                .build();
        return restResponse;
    }
    @Override
    public Object editSpecialSkill(RSpecialSkillRequest request, String studentId, String resumeId, String specialSkillId) {
        RSpecialSkill rSpecialSkill = RSpecialSkill.builder()
                .resumeId(resumeId)
                .userId(studentId)
                .id(specialSkillId)
                .special(request.special)
                .name(request.name)
                .talk(request.talk)
                .build();
        rSpecialSkillRepository.save(rSpecialSkill);
        RestResponse restResponse =RestResponse.builder()
                .data(rSpecialSkill)
                .message("更新成功")
                .build();
        return restResponse;
    }

    @Override
    public Object deleteSpecialSkill(RSpecialSkillRequest request, String studentId, String resumeId, String specialSkillId) {
        rSpecialSkillRepository.deleteById(specialSkillId);
        RestResponse restResponse =RestResponse.builder()
                .data(specialSkillId)
                .message("刪除成功")
                .build();
        return restResponse;
    }



    @Override
    public Object createLicense(RlicenseRequest Request, String studentId, String resumeId) {
        String licenseId = getId(rLicenseRepository,"license",2);
        RLicense rLicense =RLicense.builder()
                .userId(studentId)
                .resumeId(resumeId)
                .id(licenseId)
                .name(Request.name)
                .build();
        rLicenseRepository.save(rLicense);
        RestResponse restResponse =RestResponse.builder()
                .data(rLicense)
                .message("儲存成功")
                .build();
        return restResponse;
    }
    @Override
    public Object editLicense(RlicenseRequest request, String studentId, String resumeId, String licenseId) {
        RLicense rLicense =RLicense.builder()
                .userId(studentId)
                .resumeId(resumeId)
                .id(licenseId)
                .name(request.name)
                .build();
        rLicenseRepository.save(rLicense);
        return "";

    }

    @Override
    public Object deleteLicense(RlicenseRequest request, String studentId, String resumeId, String licenseId) {
        rLicenseRepository.deleteById(licenseId);
        return "刪除成功";
    }



    @Override
    public Object createProjectAchievments(RProjectAchievementsRequest Request, String studentId, String resumeId) {
        String projectAchievmentsId = getId(rProjectAchievementsRepository,"pr",2);
        RProjectAchievements rProjectAchievements= RProjectAchievements.builder()
                        .userId(studentId)
                        .resumeId(resumeId)
                        .id(projectAchievmentsId)
                        .name(Request.name)
                        .startTime(Request.startTime)
                        .endTime(Request.endTime)
                        .talk(Request.talk)
                        .url(Request.url)
                        .build();
        rProjectAchievementsRepository.save(rProjectAchievements);
        return "輸入成功";
    }
    @Override
    public Object editProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId, String projectAchievmentsId) {
        RProjectAchievements rProjectAchievements= RProjectAchievements.builder()
                .userId(studentId)
                .resumeId(resumeId)
                .id(projectAchievmentsId)
                .name(request.name)
                .startTime(request.startTime)
                .endTime(request.endTime)
                .talk(request.talk)
                .url(request.url)
                .build();
        rProjectAchievementsRepository.save(rProjectAchievements);
        return "更新成功";
    }

    @Override
    public Object deleteProjectAchievments(RProjectAchievementsRequest request, String studentId, String resumeId, String projectAchievmentsId) {
        rProjectAchievementsRepository.deleteById(projectAchievmentsId);
        return "刪除成功";
    }



    @Override
    public Object createAutobiography(RAutobiographyRequest request, String studentId, String resumeId) {
        String autobiographyId = getId(resumeRepository,"AutobiographyId",2);
        RAutobiography rAutobiography= RAutobiography.builder()
                .id(autobiographyId)
                .resumeId(resumeId)
                .userId(studentId)
                .chineseAutobiography(request.chineseAutobiography)
                .englishAutobiography(request.englishAutobiography)
                .build();
        rAutobiographyRepository.save(rAutobiography);
        return "創建成功";
    }
    @Override
    public Object editAutobiography(RAutobiographyRequest request, String studentId, String resumeId, String autobiographyId) {
        RAutobiography rAutobiography= RAutobiography.builder()
                .id(autobiographyId)
                .resumeId(resumeId)
                .userId(studentId)
                .chineseAutobiography(request.chineseAutobiography)
                .englishAutobiography(request.englishAutobiography)
                .build();
        rAutobiographyRepository.save(rAutobiography);
        return "更新成功";
    }

    @Override
    public Object deleteAutobiography(RAutobiographyRequest request, String studentId, String resumeId, String autobiographyId) {
        rAutobiographyRepository.deleteById(autobiographyId);
        return "刪除成功";
    }


    @Override
    public Object createWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId) {
        String workExperienceId = getId(rWorkHopeRepository,"Rwork",2);
        RWorkExperience rWorkExperience =RWorkExperience.builder()
                .id(workExperienceId)
                .userId(studentId)
                .resumeId(resumeId)
                .name(request.name)
                .department(request.department)
                .companyName(request.companyName)
                .build();
        rWorkExperienceRepository.save(rWorkExperience);
        return "創建成功";
    }
    @Override
    public Object editWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId, String workExperienceId) {
        RWorkExperience rWorkExperience =RWorkExperience.builder()
                .id(workExperienceId)
                .userId(studentId)
                .resumeId(resumeId)
                .name(request.name)
                .department(request.department)
                .companyName(request.companyName)
                .build();
        rWorkExperienceRepository.save(rWorkExperience);
        return "更新成功";
    }

    @Override
    public Object deleteWorkExperience(RWorkExperienceRequest request, String studentId, String resumeId, String workExperienceId) {
        rWorkExperienceRepository.deleteById(workExperienceId);
        return "刪除成功";
    }

    @Override
    public Object findAllResumeByIdAndResumeId(String userId,String resumeId) {
        Resume resume =resumeRepository.findByUserIdAndResumeId(userId,resumeId);
        RAutobiography rAutobiography =rAutobiographyRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RLicense> rLicense =rLicenseRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RProjectAchievements> rProjectAchievements =rProjectAchievementsRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RSpecialSkill> rSpecialSkill = rSpecialSkillRepository.findByUserIdAndResumeId(userId,resumeId);
        List<RWorkExperience> rWorkExperience=rWorkExperienceRepository.findByUserIdAndResumeId(userId,resumeId);
        RWorkHope rworkHope = rWorkHopeRepository.findByUserIdAndResumeId(userId,resumeId);
        System.out.println(rAutobiography);

        ResumeResponse allResume = ResumeResponse.builder()
                .userId(userId)
                .resumeId(resumeId)
                .school(resume.school)
                .number(resume.number)
                .rProjectAchievements(rProjectAchievements)
                .rAutobiography(rAutobiography)
                .rSpecialSkill(rSpecialSkill)
                .rLicense(rLicense)
                .rWorkHope(rworkHope)
                .rWorkExperience(rWorkExperience)
                .build();
                return allResume;



    }

    @Override
    public Object chooseResume(String studentId) {
        List<Resume> resume = resumeRepository.findByUserId(studentId);
        long count = resumeRepository.count();
        ChooseResumeResponse chooseResumeResponse =ChooseResumeResponse.builder()
                .resume(resume)
                .count(count)
                .build();

        return chooseResumeResponse;
    }

    @Override
    public Object editWorkHope(RWorkHopeRequest request, String studentId,String resumeId, String workHopeId) {
        RWorkHope rWorkHope =RWorkHope.builder()
                .resumeId(resumeId)
                .date(request.getDate())
                .type(request.getType())
                .userId(studentId)
                .id(workHopeId)
                .build();

        Optional rWorkHopeTest = rWorkHopeRepository.findById(workHopeId);
        rWorkHopeTest.orElseThrow();
        rWorkHopeRepository.save(rWorkHope);
        return "更新成功";
    }

    @Override
    public Object deleteWorkHope(RWorkHopeRequest request, String studentId, String resumeId, String workHopeId) {
        rWorkHopeRepository.deleteById(workHopeId);
        return "刪除成功";
    }



    private String getId(JpaRepository repository , String idType ,int x){
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
