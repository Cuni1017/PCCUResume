package com.example.demo.service.impl;

import org.junit.jupiter.api.Test;

public class dataControllTest {
    @Test
    public void palindorome(){
        String str = "cosrc";
        int left = 0 ;
        int right = str.length() - 1;
        while (right > left) {
            if(str.charAt(left) != str.charAt(right) ){
//                throw  "左右不對稱";
            }else{
                left++;
                right--;
            }
        }
    }
    public void subsequese(){
        //兩個字串
        //用兩個指標只各自的位直
        //當原本字串只到的位置的char不等於新字串的舊自質找下去
        String origin = "apple";
        String news = "apdspldwwe";
        int originPoint = 0 ;
        int newPoint = 0 ;
        while(originPoint < origin.length()){
            if(origin.charAt(originPoint) != news.charAt(newPoint)){
                originPoint++;
            }else{
//                return true;
            }
            newPoint++;
        }
    }
}
