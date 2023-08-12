package com.example.demo.service.factory;

import com.example.demo.model.ApplyType;
import org.springframework.stereotype.Service;

@Service
public class ApplyStatusStrategyFactory {

    private ApplyType applytype;

    public static ApplyStatusStrategy ApplyTypeCheck(String applyType) {
        if (applyType.equals(ApplyType.實習中.toString())) {
            return new ApplyStatusImpl();
        } else if (applyType.equals(ApplyType.廠商中斷實習.toString())) {
            return new CompanyCutApplyStatusImpl();
        } else if (applyType.equals(ApplyType.應徵中.toString())) {
            return new ApplyStatusImpl();
        } else if (applyType.equals(ApplyType.應徵失敗.toString())) {
            return new FileApplyStatusImpl();
        } else if (applyType.equals(ApplyType.面試失敗.toString())) {
            return new FileInterviewApplyStatusImpl();
        } else if (applyType.equals(ApplyType.面試中.toString())) {
            return new InterviewApplyStatusImpl();
        } else if (applyType.equals(ApplyType.待學生同意中失敗.toString())) {
            return new FileStudentAgreeApplyStatusImpl();
        } else if (applyType.equals(ApplyType.待學生同意中.toString())) {
            return new StudentAgreeApplyStatusImpl();
        } else if (applyType.equals(ApplyType.廠商超時未處理.toString())) {
            return new CompanyOutTimeAgreeApplyStatusImpl();
        }
        return null;
    }
            // 在這裡可以添加更多的城市對應的優惠策略
            // 如果沒有符合的城市，也可以返回一個默認的優惠策略或拋出異常


}