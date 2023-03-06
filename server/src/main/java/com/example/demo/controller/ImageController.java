package com.example.demo.controller;

import com.example.demo.service.PictureUploadService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final PictureUploadService pictureUploadService;

    private String fileSavePath;
    @PostMapping("/students/{studentId}/pictureUpload")
    public ResponseEntity<Object> imageUpload(
            @RequestParam("file") MultipartFile file,
            @PathVariable String studentId,
            HttpServletRequest request

    ) {
        return ResponseEntity.ok(pictureUploadService.imageUpload(studentId,file,request));
    }
//    @GetMapping("/students/{studentId}/pictureUpload")
//    public ResponseEntity<Object> imageUpload(
//            @RequestParam("file") MultipartFile file,
//            @PathVariable String studentId,
//            HttpServletRequest request
//
//    ) {
//        return ResponseEntity.ok(pictureUploadService.imageUpload(studentId,file,request));
//    }
}
