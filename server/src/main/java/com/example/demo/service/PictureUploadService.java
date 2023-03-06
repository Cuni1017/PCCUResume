package com.example.demo.service;

import com.example.demo.config.error.FileException;
import com.example.demo.reponse.RestResponse;
import com.example.demo.reponse.file.FilePath;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PictureUploadService {
    private String getRealFilePath(HttpServletRequest request){
        String realPath = request.getServletContext().getRealPath("");
        String uploadPath = realPath + "upload\\";
        return uploadPath;
    }
    public Object imageUpload(String studentId, MultipartFile file, HttpServletRequest request) {
        if(file.isEmpty()){
            throw new FileException("文件並無東西");
        }

        //String subString = realPath.substring(0,realPath.indexOf("ssm_web"));
        String originalFileName =file.getOriginalFilename();

        if(!originalFileName.endsWith(".png")) {
            throw new FileException("圖片只能上傳png");
        }

        String uploadPath = getRealFilePath(request);
        String newFileName = System.currentTimeMillis() +originalFileName.substring(originalFileName.lastIndexOf("."));
        String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() +"/images/" + newFileName;
        File filePath = new File(uploadPath,newFileName);

        if(!filePath.getParentFile().exists()){
            filePath.getParentFile().mkdir();
            System.out.println("創建目錄:"+filePath);
        }
        try {
            file.transferTo(filePath);
        } catch (IOException e) {
            throw new FileException("檔案移交錯誤");
        }
        FilePath filePathBuild = FilePath.builder()
                .url(url)
                .fillPath(filePath.toString())
                .fillName(newFileName)
                .build();
        RestResponse restResponse =RestResponse.builder()
                .data(filePathBuild)
                .message("上傳圖片成功")
                .build();
        return restResponse;

    }
}
