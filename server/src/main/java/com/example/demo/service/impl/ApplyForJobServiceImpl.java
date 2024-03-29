package com.example.demo.service.impl;

import com.example.demo.category.ApplyCategory;
import com.example.demo.config.error.MailException;
import com.example.demo.dao.*;
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
import java.util.ArrayList;
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
    private final HistoryApplyRepository historyApplyRepository;
    private final JavaMailSender mailSender;
    private final UserLikeRepository userLikeRepository;



    @Override
    public Object findUserResume(String studentName, String vacanciesId) {
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("找不到工作"+vacanciesId));
        System.out.println(vacancies.getTeacherValidType());
        System.out.println(TeacherValidType.審核通過);

        checkVacancies(vacancies);
        Student student = studentRepository.findByStudentUsername(studentName).orElseThrow(() -> new RuntimeException("找不倒學生"));
        isApplyOutTime(student.getStudentId());
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
        checkIsApply(student.getStudentId(),vacancies.getVacanciesId());
      
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
                .applyUpdateTime(LocalDate.now())
                .build();
        applyRepository.save(apply);
        userHistoryMoveRepository.save(userHistoryMove);
        RestDto restDto = RestDto.builder()
                .data(apply)
                .message("新增APPLY")
                .build();
        return restDto;
    }

    private void checkIsApply(String studentId ,String vacanciesId) {
        List<Apply> applies = applyRepository.findByUserId(studentId);
        for(Apply apply:applies) {
            if (apply.getVacanciesId().equals(vacanciesId)) {
                throw new RuntimeException("不得重複申請該職位");
            }
            else if(apply.getApplyType().equals(ApplyType.實習中)){
                throw new RuntimeException("已在實習中不得應徵其他職位");
            }
        }
    }


    @Override
    public Object findUserApply(String studentId) {
        List<Apply> applies = applyRepository.findByUserId(studentId);
        checkIsIntern(applies);
        checkIsHandle(applies);
        isApplyOutTime(studentId);
        List<String> vacanciesIds = applies.stream().map((s)->s.getVacanciesId()).distinct().collect(Collectors.toList());
        List<ApplytypeVacnciesDto> applytypeVacnciesDtoLinkedList = new LinkedList<>();
        for(String vacanciesId :vacanciesIds){
            List<Apply> apply = applyRepository.findByVacanciesIdAndUserId(vacanciesId,studentId);
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
    @Override
    public Object findUserLike(String studentUserName) {
        Student student = studentRepository.findByStudentUsername(studentUserName).orElseThrow(() -> new RuntimeException("找不倒學生"));
        List<UserLike> userLikes = userLikeRepository.findByUserId(student.getStudentId());
        List<FullVacanciesDto> FullVacanciesDtoList = new ArrayList<>();
        for(UserLike userLike : userLikes){
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(userLike.getVacanciesId());
            fullVacanciesDto.setUserLikeId(userLike.getUserLikeId());
            FullVacanciesDtoList.add(fullVacanciesDto);
        }
        return getRestDto(FullVacanciesDtoList,"查詢成功");
    }

    @Override
    public Object createUserLike(String studentUserName, String vacanciesId) {
        String userLikeId  = getId(userLikeRepository,"UL",2);
        System.out.println(userLikeId);
        Student student = studentRepository.findByStudentUsername(studentUserName).orElseThrow(() -> new RuntimeException("找不倒學生"));
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("找不到工作"+vacanciesId));
       UserLike userLike = UserLike.builder()
                       .userLikeId(userLikeId)
                       .userId(student.getStudentId())
                       .companyId(vacancies.getCompanyId())
                       .vacanciesId(vacancies.getVacanciesId())
                       .build();
        userLikeRepository.save(userLike);
        return getRestDto(userLike,"新增成功");
    }

    @Override
    public Object deleteUserLike(String studentUserName,String userLikeId) {
        Student student = studentRepository.findByStudentUsername(studentUserName).orElseThrow(() -> new RuntimeException("找不倒學生"));
        userLikeRepository.deleteById(userLikeId);
        return getRestDto(userLikeId,"刪除成功");
    }



    private void isApplyOutTime(String studentId) {
        List<Apply> applies = applyRepository.findByUserId(studentId);
        for(Apply apply:applies) {
            if(apply.getApplyType().equals(ApplyType.實習中)){
                if(apply.getApplyStartTime().isEqual(apply.getApplyEndTime())){
                    apply.setApplyType("實習結束");
                    HistoryApply historyApply = getHistoryApply(apply);
                    historyApplyRepository.save(historyApply);
                    applyRepository.deleteById(apply.getApplyId());
                }
            }
        }
    }


    private void checkIsHandle(List<Apply> applies) {
        applies.stream().filter((a)->a.getCreateTime().plusMonths(1).isAfter(LocalDate.now())).collect(Collectors.toList());

    }

    private void checkIsIntern(List<Apply> applies) {
        List<Apply> isInternApplies = applies.stream().filter((apply) -> apply.getApplyType().equals(ApplyType.實習中.toString())).collect(Collectors.toList());
        if(!isInternApplies.isEmpty() ){
            Apply apply = isInternApplies.get(0);
            List<Apply> notInternApplies =applies.stream().filter((a) -> !a.getApplyType().equals(ApplyType.實習中.toString())).collect(Collectors.toList());
            for(Apply notInternApply:notInternApplies){
                notInternApply.setApplyType(ApplyType.有實習成功其他職缺所以此應徵失敗.toString());
                HistoryApply historyApply =getHistoryApply(notInternApply);
                historyApplyRepository.save(historyApply);
                applyRepository.deleteById(notInternApply.getApplyId());
            }
        }
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
    private HistoryApply getHistoryApply(Apply apply) {
        LocalDate now = LocalDate.now();
        return HistoryApply.builder()
                .applyId(apply.getApplyId())
                .userId(apply.getUserId())
                .resumeId(apply.getResumeId())
                .vacanciesId(apply.getVacanciesId())
                .companyId(apply.getCompanyId())
                .createTime(apply.getCreateTime())
                .applyType(apply.getApplyType())
                .applyStartTime(apply.getApplyStartTime())
                .applyEndTime(apply.getApplyEndTime())
                .dieTime(now)
                .build();
    }


}
