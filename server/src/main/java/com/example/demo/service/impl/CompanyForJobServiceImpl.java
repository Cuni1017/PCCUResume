package com.example.demo.service.impl;

import com.example.demo.category.ApplyTimeCategory;
import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.dao.ApplyRepository;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.HistoryApplyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.resume.*;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.ApplyUserDto;
import com.example.demo.dto.CompanyFoJobDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.dto.resume.AllResumeDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
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
    private final VacanciesDao vacanciesDao;
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
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
            AllApplyDto       allApplyDto = AllApplyDto.builder()
                    .fullVacanciesDto(fullVacanciesDto)
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
        //
        ApplyType  newApplyType = ApplyType.valueOf(changeApplyTypeCategory.getApplyType().toString());
        Apply      apply        = getApplyById(applyId);
        Student    student      = studentRepository.findById(apply.getUserId()).orElseThrow(()->new RuntimeException("沒有此學生"));
        Vacancies  vacancies    = vacanciesRepository.findById(apply.getVacanciesId()).orElseThrow(()->new RuntimeException("沒有此職缺"));
        try{
            return  CheckApplyType(newApplyType,apply,student,vacancies,applyId);
        }catch (MailException e){
            return "郵件發送失敗: " + e.getMessage();
        }
    }
    /*
        檢查她是怎樣的狀態並把他分門別類,分別寄信並把會差生的MailException一層一層傳上來

    */
    private RestDto CheckApplyType(ApplyType newApplyType, Apply apply, Student student, Vacancies vacancies,String applyId) throws MailException{
        switch (newApplyType){
            case 面試中:
                Apply progressApply =  changeApplyType(apply,newApplyType.toString());
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),newApplyType.toString());
                return  getRestDto(progressApply,"更新成功");
            case 廠商中斷實習:
                Apply cutApply =  changeApplyType(apply,newApplyType.toString());
                HistoryApply historyApply = getHistoryApply(cutApply);
                historyApplyRepository.save(historyApply);
                applyRepository.deleteById(applyId);
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),newApplyType.toString());
                return getRestDto(historyApply,"更新成功");
            case 實習中:
                Apply InApply =  changeApplyType(apply,newApplyType.toString());
                int quantity = vacancies.getVacanciesQuantity();
                vacancies.setVacanciesQuantity(quantity--);
                vacanciesRepository.save(vacancies);
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),newApplyType.toString());
                return getRestDto(InApply,"更新成功");

            case 應徵失敗,面試失敗,待學生同意中失敗:
                Apply fileApply = changeApplyType(apply,newApplyType.toString());
                HistoryApply historyApply1 = getHistoryApply(fileApply);
                historyApplyRepository.save(historyApply1);
                applyRepository.deleteById(applyId);
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),newApplyType.toString());
                return getRestDto(fileApply,"更新成功");
            case   待學生同意中:
                Apply sucessApply =  changeApplyType(apply,newApplyType.toString());
                return getRestDto(sucessApply,"更新成功");
            default:
                throw new RuntimeException("輸入近來不是保留詞");
        }
    }
    /*
        更新使用者實習時間,如果不是實習中不能使用會報錯
    */
    @Override
    public Object updateApplyTime(String applyId,  ApplyTimeCategory applyTimeCategory) {

        Apply apply = getApplyById(applyId);
        if(!apply.getApplyType().equals(ApplyType.實習中.toString())){
            throw new RuntimeException("該應徵不是在實習中");
        }
        apply.setApplyUpdateTime(LocalDate.now());
        apply.setApplyStartTime(applyTimeCategory.getApplyStartTime());
        apply.setApplyEndTime(applyTimeCategory.getApplyEndTime());
        applyRepository.save(apply);
        RestDto restDto =getRestDto(apply,"更新成功");
        return restDto;
    }

    /*
       新增歷史應徵把他function化把apply丟進來
    */

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
    /*
       因為失敗或中斷會進到歷史職缺改變狀態它有獨特的applytype所以不儲存
    */
    private Apply changeApplyType(Apply apply,String applyType) {
        apply.setApplyType(applyType);
        apply.setApplyUpdateTime(LocalDate.now());
        if(!applyType.contains("失敗")||applyType.contains("中斷")){
            applyRepository.save(apply);
        }
        return apply;
    }
    /*
       找applyid
    */
    private Apply getApplyById(String Id){
        return applyRepository.findById(Id).orElseThrow(()->new RuntimeException("沒有此應徵"));
    }
    /*
      回傳統一格式
   */
    private RestDto getRestDto(Object o,String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }
    /*
     寄信
  */
    private void sendApplyTypeMail(String physiognomy,String vacanciesName ,String email,String applyType) throws MailException {

        MimeMessagePreparator messagePreparator = mimeMessage -> {

            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                String message = getMessage(physiognomy, vacanciesName,email, applyType);
                messageHelper.setFrom(MikeEmail.email.myEmail.toString());
                messageHelper.setTo(email);
                messageHelper.setSubject("pccu通知有關" + physiognomy + "實習資訊");
                messageHelper.setText(message);
        };
        mailSender.send(messagePreparator);
    }
    /*
         不同狀態要送出區的內容不同
      */
    private String getMessage(String physiognomy,String vacanciesName, String email, String applyType){
        if (applyType.contains("失敗")) {
            String message = "這裡很遺憾的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName +"失敗,";
            message = message +"這並不是你不夠好或是實力不足只是再不好的時機遇到我們會將您加入我們的人才儲備";
            return message;
        } else if (applyType.contains("面試")) {
            String message = "這裡很高興的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName+"通知您去面試,詳細情況公司會跟您確認";
            return message;
        } else if (applyType.contains("中斷")) {
            String message = "這裡很遺憾的通知";
            message = message + physiognomy;
            message = message +",您實習中的的實習職缺"+ vacanciesName+"中斷與您的實習合作,詳細情況公司會跟您確認";
            return message;
        }else if (applyType.contains("實習")) {
            String message = "這裡很高興的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName+"通知您去面試,詳細情況公司會跟您確認";
            return message;
        }else {
            String message = "這裡很高興的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName+"成功,";
            message = message +"需要等你前往實習網站進行確認應徵動作,如沒有確認此職缺會消失";
            return message;
        }
    }
//    private sendApplyTypeMail(){
//
//    }

}
