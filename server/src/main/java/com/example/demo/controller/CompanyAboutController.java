package com.example.demo.controller;

import com.example.demo.dao.CompanyAboutBsicRepository;
import com.example.demo.dto.ImageDto;
import com.example.demo.model.CompanyAbout;
import com.example.demo.model.CompanyAboutBasic;

import com.example.demo.service.CompanyAboutService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class CompanyAboutController {
    private final CompanyAboutService companyAboutService;

    @PostMapping("/company/{companyId}/image/company-logo")
    public ResponseEntity<Object> uploadLogoImage(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String companyId,
            HttpServletRequest httpServletRequest
    ) {
        return ResponseEntity.ok(companyAboutService.uploadLogoImage(uploadFile, companyId, httpServletRequest));
    }
    @PostMapping("/company/{companyId}/image/company-background")
    public ResponseEntity<Object> uploadBackgroundImage(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String companyId,
            HttpServletRequest httpServletRequest
    ) {
        return ResponseEntity.ok(companyAboutService.uploadBackgroundImage(uploadFile, companyId, httpServletRequest));
    }
}
//        //判断文件类型
//        if(!(uploadFile.getOriginalFilename().endsWith(".jpg") || uploadFile.getOriginalFilename().endsWith(".png"))) {
//            throw new RuntimeException("檔案類型只准png跟jpg");
//        }
//        Optional<CompanyAboutBasic> companyAboutBasic   = companyAboutRepository.findById(companyId);
//        if(!companyAboutBasic.isPresent()){
//            CompanyAboutBasic companyAboutBasic1 = companyAboutBasic.get();
//            try{
//                fileTransferTo(companyAboutBasic1,"D:\\image\\company-logo", uploadFile,httpServlet);
//            } catch(IOException ex){
//                System.out.println("上船出錯");
//            }
//        }else{
//            try{
//                fileTransferTo("D:\\image\\company-logo", uploadFile,httpServlet);
//            } catch(IOException ex){
//                System.out.println("上船出錯");
//            }
//        }
//
//
//
//        return  ResponseEntity.ok("ss");
//    }

//    private void deletePastCompanyImageLogo(CompanyAboutBasic companyAboutBasic1) {
////        companyAboutBasic1.setCompanyAboutBackgroundImageUrl(null);
////        companyAboutBasic1.setCompanyAboutBackgroundSavePath(null);
//        companyAboutBasic1.setCompanyAboutLogoImageUrl(null);
//        companyAboutBasic1.setCompanyAboutLogoSavePath(null);
//    }
//    private void savePastCompanyImageLogo(CompanyAboutBasic companyAboutBasic1) {
////        companyAboutBasic1.setCompanyAboutBackgroundImageUrl(null);
////        companyAboutBasic1.setCompanyAboutBackgroundSavePath(null);
//        companyAboutBasic1.setCompanyAboutLogoImageUrl(null);
//        companyAboutBasic1.setCompanyAboutLogoSavePath(null);
//    }
//    private void CompanyLogoFileTransferTo(CompanyAboutBasic userValue ,String path, MultipartFile uploadFile,HttpServletRequest httpServlet) throws IOException {
//
//        ImageDto imageDto = fileTransferTo( path ,uploadFile,httpServlet);
//        deletePastCompanyImageLogo(userValue);
//        savePastCompanyImageLogo()
//
//    }
//
//

