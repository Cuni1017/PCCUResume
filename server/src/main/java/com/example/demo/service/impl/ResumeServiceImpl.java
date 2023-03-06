package com.example.demo.service.impl;

import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.dao.resume.*;
import com.example.demo.dto.resume.post.*;
import com.example.demo.model.Student;
import com.example.demo.model.User;
import com.example.demo.model.resume.*;
import com.example.demo.reponse.ChooseResumeResponse;
import com.example.demo.reponse.RestResponse;
import com.example.demo.reponse.ResumeResponse;
import com.example.demo.reponse.student.StudentResponse;
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
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ResumeRepository resumeRepository;
    private final RWorkHopeRepository rWorkHopeRepository;
    private final RSpecialSkillRepository rSpecialSkillRepository;
    private final RLicenseRepository rLicenseRepository;
    private final RProjectAchievementsRepository rProjectAchievementsRepository;
    private final RAutobiographyRepository rAutobiographyRepository;
    private final RWorkExperienceRepository rWorkExperienceRepository;
    @Override
    public Object findUserById(String studentId) {
        User user =userRepository.findById(studentId).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        Student student = studentRepository.findByStudentId(studentId).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        List<Resume> resume =resumeRepository.findByUserId(studentId);
        StudentResponse studentResponse =StudentResponse.builder()
                .student(student)
                .resume(resume)
                .build();
        RestResponse restResponse =RestResponse.builder()
                .data(studentResponse)
                .message("新建成功")
                .build();
        return  restResponse;
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
                .name(resume.name)
                .userId(userId)
                .resumeId(resumeId)
                .school(resume.school)
                .rProjectAchievements(rProjectAchievements)
                .rAutobiography(rAutobiography)
                .rSpecialSkill(rSpecialSkill)
                .rLicense(rLicense)
                .rWorkHope(rworkHope)
                .rWorkExperience(rWorkExperience)
                .build();

        RestResponse restResponse =RestResponse.builder()
                .data(allResume)
                .message("查詢成功")
                .build();
        return restResponse;


    }
    @Override
    public Object createBasicResume(ResumeRequest Request,String studentId) {
        String resumeId = getId(resumeRepository , "Resume",1);

        Resume resume = Resume.builder()
                .school(School.中國文化大學)
                .userId(studentId)
                .resumeId(resumeId)
                .name(Request.getName())
                .createTime(LocalDate.now())
                .build();
        System.out.println(resume );
        resumeRepository.save(resume);

       List<Resume> resumeData =  resumeRepository.findAll();
        System.out.println(resumeData);
        RestResponse restResponse =RestResponse.builder()
                .data(resume)
                .message("創建基本履歷")
                .build();
        return restResponse;
    }
    @Override
    public Object deleteAllResumeById(String studentId, String resumeId) {
        resumeRepository.deleteByUserIdAndResumeId(studentId,resumeId);
        rAutobiographyRepository.deleteByUserIdAndResumeId( studentId, resumeId );
        rLicenseRepository.deleteByUserIdAndResumeId( studentId, resumeId );
        rProjectAchievementsRepository.deleteByUserIdAndResumeId( studentId, resumeId );
        rSpecialSkillRepository.deleteByUserIdAndResumeId( studentId, resumeId );
        rWorkExperienceRepository.deleteByUserIdAndResumeId( studentId, resumeId );
        rWorkHopeRepository.deleteByUserIdAndResumeId( studentId, resumeId );
        RestResponse restResponse =RestResponse.builder()
                .data(resumeId)
                .message("刪除此id下全部履歷")
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
    public Object deleteSpecialSkill( String studentId, String resumeId, String specialSkillId) {
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
        RestResponse restResponse =RestResponse.builder()
                .data(rLicense)
                .message("更新成功")
                .build();
        return restResponse;

    }

    @Override
    public Object deleteLicense( String studentId, String resumeId, String licenseId) {
        rLicenseRepository.deleteById(licenseId);
        RestResponse restResponse =RestResponse.builder()
                .data(licenseId)
                .message("刪除成功")
                .build();
        return restResponse;
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
        RestResponse restResponse =RestResponse.builder()
                .data(rProjectAchievements)
                .message("新增成功")
                .build();
        return restResponse;
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
        RestResponse restResponse =RestResponse.builder()
                .data(rProjectAchievements)
                .message("更新成功")
                .build();
        return restResponse;

    }

    @Override
    public Object deleteProjectAchievments( String studentId, String resumeId, String projectAchievmentsId) {
        rProjectAchievementsRepository.deleteById(projectAchievmentsId);
        RestResponse restResponse =RestResponse.builder()
                .data(projectAchievmentsId)
                .message("刪除成功")
                .build();
        return restResponse;

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
        RestResponse restResponse =RestResponse.builder()
                .data(rAutobiography)
                .message("新增成功")
                .build();
        return restResponse;

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
        RestResponse restResponse =RestResponse.builder()
                .data(rAutobiography)
                .message("更新成功")
                .build();
        return restResponse;

    }

    @Override
    public Object deleteAutobiography( String studentId, String resumeId, String autobiographyId) {
        rAutobiographyRepository.deleteById(autobiographyId);
        RestResponse restResponse =RestResponse.builder()
                .data(autobiographyId)
                .message("刪除成功")
                .build();
        return restResponse;

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
        RestResponse restResponse =RestResponse.builder()
                .data(rWorkExperience)
                .message("創建成功")
                .build();
        return restResponse;

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
        RestResponse restResponse =RestResponse.builder()
                .data(rWorkExperience)
                .message("更新成功")
                .build();
        return restResponse;
    }

    @Override
    public Object deleteWorkExperience( String studentId, String resumeId, String workExperienceId) {
        rWorkExperienceRepository.deleteById(workExperienceId);
        RestResponse restResponse =RestResponse.builder()
                .data(workExperienceId)
                .message("刪除成功")
                .build();
        return restResponse;
    }



    @Override
    public Object chooseResume(String studentId) {
        List<Resume> resume = resumeRepository.findByUserId(studentId);
        long count = resumeRepository.countByUserId(studentId);
        ChooseResumeResponse chooseResumeResponse =ChooseResumeResponse.builder()
                .resume(resume)
                .count(count)
                .build();
        System.out.println(resume);
        RestResponse restResponse =RestResponse.builder()
                .data(chooseResumeResponse)
                .message("查詢成功")
                .build();
        return restResponse;

    }
    @Override
    public Object createWorkHope(RWorkHopeRequest request, String studentId, String resumeId) {
        String workHopeId =getId(rWorkHopeRepository ,"WH",2);
        RWorkHope rWorkHope =RWorkHope.builder()
                .resumeId(resumeId)
                .date(request.getDate())
                .type(request.getType())
                .userId(studentId)
                .id(workHopeId)
                .build();
        rWorkHopeRepository.save(rWorkHope);
        RestResponse restResponse =RestResponse.builder()
                .data(rWorkHope)
                .message("查詢成功")
                .build();
        return restResponse;
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
        RestResponse restResponse =RestResponse.builder()
                .data(rWorkHopeTest)
                .message("更新成功")
                .build();
        return restResponse;

    }

    @Override
    public Object deleteWorkHope( String studentId, String resumeId, String workHopeId) {
        rWorkHopeRepository.deleteById(workHopeId);
        RestResponse restResponse =RestResponse.builder()
                .data(workHopeId)
                .message("刪除成功")
                .build();
        return restResponse;
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
