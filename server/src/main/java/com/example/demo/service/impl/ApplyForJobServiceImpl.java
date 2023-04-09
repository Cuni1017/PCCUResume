package com.example.demo.service.impl;

import com.example.demo.category.ApplyCategory;
import com.example.demo.config.error.MailException;
import com.example.demo.dao.ApplyRepository;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.UserHistoryMoveRepository;
import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.resume.ResumeRepository;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.ApplytypeVacnciesDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.applyforjob.ApplyCompanyDto;
import com.example.demo.dto.applyforjob.ApplyVacanciesDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.model.*;
import com.example.demo.model.resume.Resume;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.service.ApplyForJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplyForJobServiceImpl implements ApplyForJobService {
    private  final ResumeRepository resumeRepository;
    private  final StudentRepository studentRepository;
    private final ApplyDao applyForJobDao;
    private final VacanciesRepository vacanciesRepository;
    private final  UserHistoryMoveRepository userHistoryMoveRepository;
    private final  ApplyRepository applyRepository;
    private final  CompanyRepository companyRepository;
    private final VacanciesDao vacanciesDao;

    private final JavaMailSender mailSender;

    @Override
    public Object findUserResume(String studentName, String vacanciesId) {
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("找不到工作"+vacanciesId));
        System.out.println(vacancies.getTeacherValidType());
        System.out.println(TeacherValidType.審核通過);
        checkVacancies(vacancies);
        Student student = studentRepository.findByStudentUsername(studentName).orElseThrow(() -> new RuntimeException("找不倒學生"));
        List<Resume> resumes = resumeRepository.findByUserId(student.getStudentId());
        ApplyCompanyDto applyCompanyDto = applyForJobDao.findByVacanciesId(vacanciesId);

        ApplyVacanciesDto applyVacanciesDto = ApplyVacanciesDto.builder()
                .applyCompanyDto(applyCompanyDto)
                .resumes(resumes)
                .StudentEmail(student.getStudentEmail())
                .StudentId(student.getStudentId())
                .StudentNumber(student.getStudentNumber())
                .StudentUsername(student.getStudentUsername())
                .StudentImageUrl(student.getStudentImageUrl())
                .build();
        RestDto restDto = RestDto.builder()
                .data(applyVacanciesDto)
                .message("查詢成功")
                .build();
        return  restDto;
    }

    @Override
    public Object createApply(String userId,String companyId, String resumeId,  String vacanciesId, ApplyCategory applyCategory) {
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("沒有此職缺"+vacanciesId));
        String ApplyId = getId(applyRepository,"A" ,1);
        Company company =companyRepository.findById(companyId).orElseThrow(()->new RuntimeException("沒有此公司"+companyId));
        Student student = studentRepository.findById(userId).orElseThrow(()->new RuntimeException("沒有此學生"+userId));

        checkVacancies(vacancies);
        plusApplyCount(vacancies);
        sendApplyEmail(student,vacancies.getVacanciesName(),company.getCompanyEmail(),applyCategory);

        HistoryUserMove userHistoryMove = HistoryUserMove.builder()
                .userId(userId)
                .vacanciesId(vacancies.getVacanciesId())
                .createTime(LocalDate.now())
                .moveType(MoveType.應徵.toString())
                .build();
        Apply apply = Apply.builder()
                .userId(userId)
                .applyId(ApplyId)
                .resumeId(resumeId)
                .vacanciesId(vacanciesId)
                .companyId(companyId)
                .applyNumber(applyCategory.getApplyNumber())
                .applyEmail(applyCategory.getApplyEmail())
                .applyBeforeTalk(applyCategory.getApplyBeforeTalk())
                .createTime(LocalDate.now())
                .applyType(ApplyType.應徵中.toString())
                .build();
        applyRepository.save(apply);
        userHistoryMoveRepository.save(userHistoryMove);
        RestDto restDto = RestDto.builder()
                .data(apply)
                .message("新增APPLY")
                .build();
        return restDto;
    }

    @Override
    public Object findUserApply(String studentId) {
        List<Apply> applies = applyRepository.findByUserId(studentId);
        List<String> vacanciesIds = applies.stream().map((s)->s.getVacanciesId()).distinct().collect(Collectors.toList());
        List<ApplytypeVacnciesDto> applytypeVacnciesDtoLinkedList = new LinkedList<>();
        for(String vacanciesId :vacanciesIds){
            List<Apply> apply = applyRepository.findByVacanciesId(vacanciesId);
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
            ApplytypeVacnciesDto applytypeVacnciesDto=ApplytypeVacnciesDto.builder()
                    .apply(apply)
                    .fullVacanciesDto(fullVacanciesDto)
                    .build();
            applytypeVacnciesDtoLinkedList.add(applytypeVacnciesDto);
        }
        RestDto restDto = RestDto.builder()
                .data(applytypeVacnciesDtoLinkedList)
                .message("查詢成功")
                .build();
        return restDto;
    }

    private void checkVacancies(Vacancies vacancies) {
        if(vacancies.getVacanciesQuantity()<=0){
            throw new RuntimeException("職缺數量不足");
        }
        if(!vacancies.getTeacherValidType().equals(TeacherValidType.審核通過.toString())){
            throw new RuntimeException("職缺教師尚未審核通過");
        }
        if(vacancies.getVacanciesWatchType().equals(VacanciesWatchType.暫停.toString())){
            throw new RuntimeException("職缺已被設定暫停應徵");
        }
    }
    private void plusApplyCount(Vacancies vacancies) {
        int applyCount = vacancies.getApplyCount() + 1;
        vacancies.setApplyCount(applyCount);
        vacanciesRepository.save(vacancies);
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
    private void sendApplyEmail(Student student,String vacanciesName,String companyEmail, ApplyCategory applyCategory) throws MailException {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            String message =  "學生名稱:"+student.getStudentName()+"\n" +
                              "學生email:"+applyCategory.getApplyEmail()+"\n"+
                              "學生電話號碼:"+applyCategory.getApplyNumber()+"\n"+
                              "應徵者想說的話:"+ applyCategory.getApplyBeforeTalk();
            String subject = "pccu學生"+student.getStudentName()+"應徵"+vacanciesName+"職位";
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(MikeEmail.email.myEmail.toString());
            messageHelper.setTo(companyEmail);
            messageHelper.setSubject(subject);
            messageHelper.setText(message);
        };
        mailSender.send(messagePreparator);
    }

}
