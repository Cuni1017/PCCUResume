package com.example.demo.service.impl;

import com.example.demo.category.ApplyCategory;
import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.category.RoleCategory;
import com.example.demo.category.resume.post.SearchCategory;
import com.example.demo.dao.*;
import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.resume.*;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.*;
import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.dto.vacancies.PageVacanciesDto;
import com.example.demo.dto.vacancies.VacanciesDto;
import com.example.demo.model.*;
import com.example.demo.model.resume.Resume;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
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
    private final TeacherRepository teacherRepository;
    private final ResumeRepository resumeRepository;

    private final RWorkHopeRepository rWorkHopeRepository;
    private final RSpecialSkillRepository rSpecialSkillRepository;
    private final RLicenseRepository rLicenseRepository;
    private final RProjectAchievementsRepository rProjectAchievementsRepository;
    private final RAutobiographyRepository rAutobiographyRepository;
    private final RWorkExperienceRepository rWorkExperienceRepository;
    private final RSkillRepository rSkillRepository;
    private final RSubjectRepository rSubjectRepository;
    private final ResumeDao resumeDao;
    private final JavaMailSender mailSender;
    @Override
    public Object findById(String teacherId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId).orElseThrow(()->new RuntimeException("沒有此教師"));
        User user = userRepository.findById(teacherId).orElseThrow(()->new RuntimeException("沒有此使用者"));
        TeacherDto teacherDto = TeacherDto.builder()
                .teacherId(teacher.getTeacherId())
                .teacherImageUrl(teacher.getTeacherImageUrl())
                .teacherUsername(teacher.getTeacherUsername())
                .teacherName(teacher.getTeacherName())
                .role(user.getRole().toString())
                .build();
        return getRestDto(teacherDto,"查詢成功");
    }



    @Override
    public Object findNewsById() {
        LocalDate beforeFiveDay = LocalDate.now().minusDays(5);

        System.out.println(beforeFiveDay);
        List<Student> students      = studentRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.STUDENT_USER.toString());
        List<Company> companies     = companyRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.COMPANY_USER.toString());
        List<CompanyVacanciesDto> vacancies = vacanciesDao.findApplyVacanciesByVacanciesUpdateTime(beforeFiveDay, TeacherValidType.審核中.toString());

        List<String> vacanciesIds = applyDao.findApplyVacanciesIdByApplyUpdateTime(beforeFiveDay);
        List<AllApplyDto> allApplyDtoList = new LinkedList<>();
        vacanciesIds = vacanciesIds.stream().distinct().collect(Collectors.toList());

        for(String vacanciesId : vacanciesIds){
            List<ApplyUserDto> applyUserDto = applyDao.findApplyVacanciesAndUserByVacanciesId(vacanciesId,null);
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
                .CompanyVacanciesDto(vacancies)
                .build();
        return  getRestDto(newsDto,"查詢成功");
    }



    @Override
    public Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory) {
        updateRole(studentId,teacherId,roleCategory);
        return getRestDto(roleCategory.getRole(),"更新成功");
    }
    @Override
    public Object deleteStudentRole(String teacherId, String studentId) {
        userRepository.deleteById(studentId);
        studentRepository.deleteById(studentId);
        Student student = studentRepository.findById(studentId).orElseThrow(()->new RuntimeException("沒有此學生"));
        sendApplyTypeMail("student",student.getStudentName() ,student.getStudentEmail());
        List<Resume> resumes = resumeRepository.findByUserId(studentId);
        for(int i =0 ; i<= resumes.size();i++){
            String resumeId = resumes.get(i).getResumeId();
            resumeRepository.deleteByUserIdAndResumeId(studentId,resumeId);
            rAutobiographyRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            rLicenseRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            rProjectAchievementsRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            rSpecialSkillRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            rWorkExperienceRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            rWorkHopeRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            rSubjectRepository.deleteByUserIdAndResumeId( studentId, resumeId );
            resumeDao.deleteByResumeId(resumeId);
        }
        return getRestDto(studentId,"刪除成功");
    }

    @Override
    public Object findStudentByRole(int page , int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<Student> students = studentRepository.findByRole(Role.STUDENT_USER.toString(),selectLimit,selectOffset);
        Long total = students.stream().count();

        StudentReviewDto studentReviewDto = StudentReviewDto.builder()
                .students(students)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(studentReviewDto,"查詢成功");
    }

    @Override
    public Object findCompanyByRole(int page , int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<Company> companies = companyRepository.findByRole(Role.COMPANY_USER.toString(),selectLimit,selectOffset);
        Long total = companies.stream().count();
        CompanyReview companyReview = CompanyReview.builder()
                .companies(companies)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(companies,"查詢成功");
    }

    @Override
    public Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory) {
        updateRole(companyId,teacherId,roleCategory);
        return getRestDto(roleCategory.getRole(),"更新成功");
    }
    @Override
    public Object deleteCompanyByRole(String teacherId, String companyId) {
        Company company = companyRepository.findById(companyId).orElseThrow(()->new RuntimeException("每有此公司"));
        sendApplyTypeMail("company",company.getCompanyName() ,company.getCompanyEmail());
        userRepository.deleteById(companyId);
        companyRepository.deleteById(companyId);
        vacanciesRepository.deleteByCompanyId(companyId);
        applyRepository.deleteByCompanyId(companyId);
        return getRestDto(companyId,"刪除成功");
    }



    @Override
    public Object findVacanciesByTeacherValidType(int page , int limit, SearchCategory searchCategory) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        String search = searchCategory.getSearchName();
        List<CompanyVacanciesDto> companyVacanciesDtos = vacanciesDao.findPageVacanciesReview(selectLimit,selectOffset,search);
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
        vacancies.setVacanciesUpdateTime(LocalDate.now());
        vacancies.setTeacherId(teacherId);
        vacanciesRepository.save(vacancies);

        return getRestDto(vacancies,"更新成功");
    }

    @Override
    public Object findApply(String teacherId, ChangeApplyTypeCategory changeApplyTypeCategory,int page,int limit) {

            List<AllApplyDto> allApplyDtoList = new LinkedList<>();
            int selectOffset = getSelectOffset(page,limit);
            int selectLimit = getSelectLimit(page,limit);
            List<ApplyUserDto> applyUserDto = applyDao.findApplyVacanciesAndUserByapplyType(changeApplyTypeCategory.getApplyType());
        System.out.println(applyUserDto);
            List<String> vacanciesIds = applyUserDto.stream().map(a->a.getVacanciesId()).distinct().collect(Collectors.toList());
            for(String vacanciesId:vacanciesIds){
                System.out.println(vacanciesId);
                List<ApplyUserDto> applyUserDtos = applyUserDto.stream().filter(s ->s.getVacanciesId() == vacanciesId).collect(Collectors.toList());
                FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
                AllApplyDto  allApplyDto = AllApplyDto.builder()
                        .fullVacanciesDto(fullVacanciesDto)
                        .ApplyUserDto(applyUserDtos)
                        .build();
                allApplyDtoList.add(allApplyDto);
            }
        long total   =allApplyDtoList.stream().count();
        List<AllApplyDto> allApplyDtoList1 = allApplyDtoList.stream().limit(selectLimit).skip(selectOffset).collect(Collectors.toList());
        ApplyReviewDto applyReviewDto = ApplyReviewDto.builder()
                .allApplyDtoList1(allApplyDtoList1)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(applyReviewDto,"查詢成功");
    }
    @Override
    public Object updateApply(String teacherId,String applyId, ChangeApplyTypeCategory changeApplyTypeCategory) {
        Apply apply = applyRepository.findById(applyId).orElseThrow(()->new RuntimeException("沒有此apply"));
        apply.setApplyUpdateTime(LocalDate.now());
        apply.setApplyType(changeApplyTypeCategory.getApplyType().toString());
        applyRepository.save(apply);
        return getRestDto(apply,"更新成功");
    }




    private void updateRole(String userId, String teacherId,RoleCategory roleCategory) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("使用者不存在"));
        if(userId.startsWith("S")){
            user.setRole(roleCategory.getRole());
        }else{
            user.setRole(roleCategory.getRole());
        }
        userRepository.save(user);

    }


    private RestDto getRestDto(Object o, String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }
    private void sendApplyTypeMail(String physiognomy,String name ,String email) throws MailException {

        MimeMessagePreparator messagePreparator = mimeMessage -> {

            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            String message = getMessage(physiognomy, name,email);
            messageHelper.setFrom(MikeEmail.email.myEmail.toString());
            messageHelper.setTo(email);
            messageHelper.setSubject("pccu通知有關" + physiognomy + "實習資訊");
            messageHelper.setText(message);
        };
        mailSender.send(messagePreparator);
    }
    private String getMessage(String physiognomy,String name ,String email){
        String message = "這裡很遺憾的通知";
        message = message +"pccu實習您申請的"+ physiognomy +"帳號:" +name+"不通過已被刪除";
        return message;
    }
    private int getSelectOffset(int page,int limit){
        return (page-1)*limit;
    }
    private int getSelectLimit(int page,int limit){
        return page*limit;
    }

}
