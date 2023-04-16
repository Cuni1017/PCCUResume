package com.example.demo.service.impl;

import com.example.demo.category.RSkillCategory;
import com.example.demo.dao.resume.RSkillRepository;
import com.example.demo.dao.resume.ResumeDao;
import com.example.demo.dto.RestDto;
import com.example.demo.model.Student;
import com.example.demo.model.resume.RSkill;
import com.example.demo.model.resume.RSkillId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Service
class ResumeServiceImplTest {
    @Autowired
    private  ResumeDao resumeDao;
    private RSkillRepository rSkillRepository ;
    @Test
    public void createSkill(){
//        String skillId = getId(rSkillRepository,"skill",2);
        List<Integer> s = List.of(1,2,3);
        RSkillCategory rSkillCategory =RSkillCategory.builder()
                .skillIds(s)
                .build();
        for (int i = 0;i<s.size();i++){
//            String skillId = getId(rSkillRepository,"skill",2);
            RSkillId rSkillId = RSkillId.builder()
                    .resumeId("R2023022802")
                    .rSkillId("sc")
                    .skillId(s.get(i))
                    .build();
            RSkill rSkill = RSkill.builder()
                    .rSkillId(rSkillId)
                    .build();
            System.out.println(rSkill);
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

}