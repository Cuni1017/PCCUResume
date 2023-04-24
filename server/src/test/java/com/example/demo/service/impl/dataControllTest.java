package com.example.demo.service.impl;

import org.junit.jupiter.api.Test;

import java.util.LinkedList;
import java.util.List;

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
    @Test
    public void window(){
        List<Character> window = new LinkedList<>();
        String str = "sascweqdbkjg";
        int start = 0;
        int end = 0;
        while(end<str.length()){
            if(window.contains(str.charAt(end))){
                if(start<str.length()-1){
                    window.remove(str.charAt(start));
                }

                start++;

            }else{
                window.add(str.charAt(end));
                end++;
            }
        }
        System.out.println(window);
    }
//    public void fib(int n){
//        if(n==0){
//            System.out.println(0);
//        }
//        if(n==1){
//            System.out.println(1);
//        }else{
//            System.out.println(fib(n-1) + fib(n-2));;
//        }
//    }
}
