package com.example.demo.service.impl;

import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.dao.ApplyRepository;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.HistoryApplyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.resume.*;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.ApplyUserDto;
import com.example.demo.dto.CompanyFoJobDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.dto.resume.AllResumeDto;
import com.example.demo.model.*;
import com.example.demo.model.resume.*;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.service.CompanyForJobService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
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
public class CompanyForJobServiceImpl implements CompanyForJobService {
    private final ApplyRepository applyRepository;
    private final VacanciesRepository vacanciesRepository;
    private final ApplyDao applyDao;
    private final StudentRepository studentRepository;
    private final HistoryApplyRepository historyApplyRepository;
    private final CompanyRepository companyRepository;
    private final JavaMailSender mailSender;
    private final ResumeRepository resumeRepository;
    private final RWorkHopeRepository rWorkHopeRepository;
    private final RSpecialSkillRepository rSpecialSkillRepository;
    private final RLicenseRepository rLicenseRepository;
    private final RProjectAchievementsRepository rProjectAchievementsRepository;
    private final RAutobiographyRepository rAutobiographyRepository;
    private final RWorkExperienceRepository rWorkExperienceRepository;

    private final RSubjectRepository rSubjectRepository;




//

    @Override
    public Object findVacanciesApplyBycompanyName(String companyName,String applyType) {
        List<String> vacanciesIds = applyDao.findApplyVacanciesIdByCompanyName(companyName);
        List<AllApplyDto> allApplyDtoList = new LinkedList<>();
        vacanciesIds = vacanciesIds.stream().distinct().collect(Collectors.toList());

        for(String vacanciesId : vacanciesIds){
            List<ApplyUserDto> applyUserDto = applyDao.findApplyVacanciesAndUserByVacanciesId(vacanciesId,applyType);
            Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("沒有此職缺"));
            AllApplyDto allApplyDto=AllApplyDto.builder()
                    .vacancies(vacancies)
                    .ApplyUserDto(applyUserDto)
                    .build();
            allApplyDtoList.add(allApplyDto);
        }
        RestDto restDto = RestDto.builder()
                .data(allApplyDtoList)
                .message("查詢成功")
                .build();
        return restDto;

    }

    @Transactional
    @Modifying
    @Override
    public Object  changeApply(String applyId, ChangeApplyTypeCategory changeApplyTypeCategory) {

        ApplyType  newApplyType = ApplyType.valueOf(changeApplyTypeCategory.getApplyType().toString());
        Apply      apply        = getApplyById(applyId);
        Student    student      = studentRepository.findById(apply.getUserId()).orElseThrow(()->new RuntimeException("沒有此學生"));
        Vacancies  vacancies    = vacanciesRepository.findById(apply.getVacanciesId()).orElseThrow(()->new RuntimeException("沒有此職缺"));
        switch (newApplyType){
            case 面試中:
                Apply progressApply =  changeApplyType(apply,newApplyType.toString());
                try {
                    sendApplyTypeMail(vacancies ,student,newApplyType.toString());
                    RestDto restDto = RestDto.builder()
                            .data(progressApply)
                            .message("更新成功")
                            .build();
                    return restDto;
                } catch (MailException e) {
                    // 在這裡處理異常情況
                    return "郵件發送失敗: " + e.getMessage();
                }
            case 實習中:
                Apply InApply =  changeApplyType(apply,newApplyType.toString());
                int quantity = vacancies.getVacanciesQuantity();
                vacancies.setVacanciesQuantity(quantity--);
                vacanciesRepository.save(vacancies);
                return getRestDto(InApply,"更新成功");
            case 應徵失敗,面試失敗,待學生同意中失敗:
                Apply fileApply = changeApplyType(apply,ApplyType.應徵失敗.toString());
                HistoryApply historyApply = getHistoryApply(fileApply);

                historyApplyRepository.save(historyApply);
                applyRepository.deleteById(applyId);

                try {
                    sendApplyTypeMail(vacancies ,student,newApplyType.toString());
                    RestDto restDto = RestDto.builder()
                            .data(historyApply)
                            .message("更新成功")
                            .build();
                    return restDto;
                } catch (MailException e) {
                    // 在這裡處理異常情況
                    return "郵件發送失敗: " + e.getMessage();
                }
            case   待學生同意中:
                Apply sucessApply =  changeApplyType(apply,newApplyType.toString());
                try {
                    sendApplyTypeMail(vacancies ,student,newApplyType.toString());
                    RestDto restDto = RestDto.builder()
                            .data(sucessApply)
                            .message("更新成功")
                            .build();
                    return restDto;
                } catch (MailException e) {
                    // 在這裡處理異常情況
                    return "郵件發送失敗: " + e.getMessage();
                }
            default:
                throw new RuntimeException("輸入近來不是保留詞");
        }

    }

    @Override
    public Object updateApplyTime(String applyId, LocalDate applyStartTime, LocalDate applyEndTime) {

        Apply apply = getApplyById(applyId);
        if(apply.getApplyType() != ApplyType.實習中.toString()){
            throw new RuntimeException("該應徵不是在實習中");
        }
        apply.setApplyStartTime(applyStartTime);
        apply.setApplyEndTime(applyEndTime);
        applyRepository.save(apply);
        return apply;
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

    private Apply changeApplyType(Apply apply,String applyType) {
        apply.setApplyType(applyType);
        if(!applyType.contains("失敗")){
            applyRepository.save(apply);
        }
        return apply;
    }
    private Apply getApplyById(String Id){
        return applyRepository.findById(Id).orElseThrow(()->new RuntimeException("沒有此應徵"));
    }
    private RestDto getRestDto(Object o,String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }
    private void sendApplyTypeMail(Vacancies vacancies ,Student student,String applyType) throws MailException {

        MimeMessagePreparator messagePreparator = mimeMessage -> {

            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                String message = getMessage(vacancies, student, applyType);
                messageHelper.setFrom(MikeEmail.email.myEmail.toString());
                messageHelper.setTo(student.getStudentEmail());
                messageHelper.setSubject("pccu應徵" + vacancies.getVacanciesName() + "實習結果");
                messageHelper.setText(message);
        };
        mailSender.send(messagePreparator);
    }

    private String getMessage(Vacancies vacancies, Student student, String applyType){
        if (applyType.contains("失敗")) {
            String message = "這裡很遺憾的通知";
            message = message + student.getStudentName();
            message = message +",您應徵的實習職缺"+ vacancies.getVacanciesName()+"失敗,";
            message = message +"這並不是你不夠好或是實力不足只是再不好的時機遇到我們會將您加入我們的人才儲備";
            return message;
        } else if (applyType.contains("面試")) {
            String message = "這裡很高興的通知";
            message = message + student.getStudentName();
            message = message +",您應徵的實習職缺"+ vacancies.getVacanciesName()+"通知您去面試,詳細情況公司會跟您確認";
            return message;
        } else if (applyType.contains("實習")) {
            String message = "這裡很高興的通知";
            message = message + student.getStudentName();
            message = message +",您應徵的實習職缺"+ vacancies.getVacanciesName()+"通知您去面試,詳細情況公司會跟您確認";
            return message;
        }else {
            String message = "這裡很高興的通知";
            message = message + student.getStudentName();
            message = message +",您應徵的實習職缺"+ vacancies.getVacanciesName()+"成功,";
            message = message +"需要等你前往實習網站進行確認應徵動作,如沒有確認此職缺會消失";
            return message;
        }
    }
//    private sendApplyTypeMail(){
//
//    }

}
