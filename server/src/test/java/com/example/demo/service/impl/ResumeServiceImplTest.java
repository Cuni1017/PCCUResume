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
import java.util.*;
import java.util.stream.Stream;

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


    }@Test
    public void streamTest(){
        int[] x = new int[]{1,2,8,6,9,7};
        for (int i = 1 ; i<=x.length-1 ; i++){
            int key = x[i];
            int j = i-1;
            while(j >= 0 && key >x[j] ){
                int change = x[j];
                x[j] = x[j+1];
                x[j+1] = change;
                j--;
            }
        }
        for (int i = 0 ; i<x.length ; i++) {
            System.out.println(x[i]);
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