package com.example.demo.controller;

import com.example.demo.category.CompanyAboutBasicCategory;

import com.example.demo.category.CompanyAboutServiceCategory;
import com.example.demo.category.CompanyAboutWelfareCategory;
import com.example.demo.service.CompanyAboutService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class CompanyAboutController {
    private final CompanyAboutService companyAboutService;
    @GetMapping("/company/{companyName}/company-about")
    public ResponseEntity<Object> findAllCompanyAboutByCompanyName(
            @PathVariable String companyName
    ) {
        return ResponseEntity.ok(companyAboutService.findAllCompanyAboutByCompanyName(companyName));
    }
    @PostMapping("/company/{companyName}/image/company-logo")
    public ResponseEntity<Object> uploadLogoImage(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String companyName,
            HttpServletRequest httpServletRequest
    ) {
        return ResponseEntity.ok(companyAboutService.uploadLogoImage(uploadFile, companyName, httpServletRequest));
    }
    @PostMapping("/company/{companyName}/image/company-background")
    public ResponseEntity<Object> uploadBackgroundImage(
            @RequestPart("file") MultipartFile uploadFile,
            @PathVariable String companyName,
            HttpServletRequest httpServletRequest
    ) {
        return ResponseEntity.ok(companyAboutService.uploadBackgroundImage(uploadFile, companyName, httpServletRequest));
    }
    @GetMapping("/company/{companyName}/company-about-basic")
    public ResponseEntity<Object> findCompanyAboutBasicByCompanyName(
            @PathVariable String companyName
    ) {
        return ResponseEntity.ok(companyAboutService.findCompanyAboutBasicByCompanyName(companyName));
    }
    @PostMapping("/company/{companyName}/company-about-basic")
    public ResponseEntity<Object> createCompanyAboutBasic(
            @PathVariable String companyName,
            @RequestBody CompanyAboutBasicCategory companyAboutBasicCategory
    ) {
        return ResponseEntity.ok(companyAboutService.createCompanyAboutBasic(companyName,companyAboutBasicCategory));
    }
    @PutMapping("/company/{companyName}/company-about-basic")
    public ResponseEntity<Object> updateCompanyAboutBasic(
            @PathVariable String companyName,
            @RequestBody CompanyAboutBasicCategory companyAboutBasicCategory
    ) {
        return ResponseEntity.ok(companyAboutService.updateCompanyAboutBasic(companyName,companyAboutBasicCategory));
    }
    @DeleteMapping("/company/{companyName}/company-about-basic")
    public ResponseEntity<Object> deleteCompanyAboutBasic(
            @PathVariable String companyName
    ) {
        return ResponseEntity.ok(companyAboutService.deleteCompanyAboutBasic(companyName));
    }
    @GetMapping("/company/{companyName}/company-about-service")
    public ResponseEntity<Object> findCompanyAboutServiceByCompanyName(
            @PathVariable String companyName
    ) {
        return ResponseEntity.ok(companyAboutService.findCompanyAboutServiceByCompanyName(companyName));
    }
    @PostMapping("/company/{companyName}/company-about-service")
    public ResponseEntity<Object> createCompanyAboutService(
            @PathVariable String companyName,
            @RequestBody CompanyAboutServiceCategory companyAboutBasicCategory
    ) {
        return ResponseEntity.ok(companyAboutService.createCompanyAboutService(companyName,companyAboutBasicCategory));
    }
    @PutMapping("/company/{companyName}/company-about-service")
    public ResponseEntity<Object> updateCompanyAboutService(
            @PathVariable String companyName,
            @RequestBody CompanyAboutServiceCategory companyAboutBasicCategory
    ) {
        return ResponseEntity.ok(companyAboutService.updateCompanyAboutService(companyName,companyAboutBasicCategory));
    }
    @DeleteMapping("/company/{companyName}/company-about-service")
    public ResponseEntity<Object> deleteCompanyAboutService(
            @PathVariable String companyName

    ) {
        return ResponseEntity.ok(companyAboutService.deleteCompanyAboutService(companyName));
    }
    @GetMapping("/company/{companyName}/company-about-welfare")
    public ResponseEntity<Object> findCompanyAboutWelfareByCompanyName(
            @PathVariable String companyName
    ) {
        return ResponseEntity.ok(companyAboutService.findCompanyAboutWelfareByCompanyName(companyName));
    }
    @PostMapping("/company/{companyName}/company-about-welfare")
    public ResponseEntity<Object> createCompanyAboutWelfare(
            @PathVariable String companyName,
            @RequestBody CompanyAboutWelfareCategory companyAboutWelfareCategory
    ) {
        return ResponseEntity.ok(companyAboutService.createCompanyAboutWelfare(companyName,companyAboutWelfareCategory));
    }
    @PutMapping("/company/{companyName}/company-about-welfare")
    public ResponseEntity<Object> updateCompanyAboutWelfare(
            @PathVariable String companyName,
            @RequestBody CompanyAboutWelfareCategory companyAboutWelfareCategory
    ) {
        return ResponseEntity.ok(companyAboutService.updateCompanyAboutWelfare(companyName,companyAboutWelfareCategory));
    }
    @DeleteMapping("/company/{companyName}/company-about-welfare")
    public ResponseEntity<Object> deleteCompanyAboutWelfare(
            @PathVariable String companyName

    ) {
        return ResponseEntity.ok(companyAboutService.deleteCompanyAboutWelfare(companyName));
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

