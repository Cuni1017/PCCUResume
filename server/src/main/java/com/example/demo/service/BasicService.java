package com.example.demo.service;


import com.example.demo.dto.RestDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public interface BasicService {
     default int getSelectOffset(int page,int limit){
        return (page-1)*limit;
    }
     default int getSelectLimit(int page,int limit){
        return page*limit;
    }
     default String getId(JpaRepository repository , String idType , int x){
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
    default void deleteFile(String imageRealPath) {
        System.out.println(imageRealPath);
        File file = new File(imageRealPath);
        System.out.println("File:"+file);
        if(file.exists()){
            file.delete();
        }

    }
    default RestDto getRestDto(Object o, String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }

}
