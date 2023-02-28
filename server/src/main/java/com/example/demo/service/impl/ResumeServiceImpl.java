package com.example.demo.service.impl;

import com.example.demo.dao.resume.RWorkHopeRepository;
import com.example.demo.dao.resume.ResumeRepository;
import com.example.demo.model.resume.RWorkHope;
import com.example.demo.model.resume.Resume;
import com.example.demo.model.resume.School;
import com.example.demo.dto.resume.post.ResumeRequest;
import com.example.demo.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final RWorkHopeRepository rWorkHopeRepository;
    @Override
    public Resume createBasicResume(ResumeRequest Request,String studentId) {
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
                .build();
        System.out.println(resume );
        resumeRepository.save(resume);
        rWorkHopeRepository.save(rWorkHope);
       List<Resume> resumeData =  resumeRepository.findAll();
        System.out.println(resumeData);

        return resume;

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
