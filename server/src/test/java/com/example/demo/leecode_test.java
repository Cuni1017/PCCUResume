package com.example.demo;

import java.util.LinkedList;
import java.util.List;

public class leecode_test {
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb"));
    }
    public static int lengthOfLongestSubstring(String s) {
        List<Character> window = new LinkedList<>();
        int left = 0;
        int right = 0;
        int i = 0;
        int size = window.size();
        while(i<size && window.get(left) !=null && window.get(right) !=null){
            System.out.println(window.get(left));
            System.out.println(window.get(right));
            if(window.get(left).equals(window.get(right))){

                left++;
                right ++ ;
            }else{
                right ++ ;
            }
            i++;
        }
        return right-left+1;

    }
}
