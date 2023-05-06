package com.example.demo.service.impl;

import com.example.demo.dao.CompanyAboutBsicRepository;
import com.example.demo.dto.ImageDto;
import com.example.demo.dto.RestDto;
import com.example.demo.model.CompanyAboutBasic;
import com.example.demo.service.CompanyAboutService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class CompanyAboutServiceImpl implements CompanyAboutService {
    private  final CompanyAboutBsicRepository companyAboutBsicRepository;
    @Override
    public Object uploadLogoImage(MultipartFile uploadFile, String companyId, HttpServletRequest httpServletRequest) {
        return uploadImage( uploadFile,  companyId,  httpServletRequest);
    }

    @Override
    public Object uploadBackgroundImage(MultipartFile uploadFile, String companyId, HttpServletRequest httpServletRequest) {
        return uploadImage( uploadFile,  companyId,  httpServletRequest);
    }

    private RestDto uploadImage(MultipartFile uploadFile, String companyId, HttpServletRequest httpServletRequest){
        String uri = httpServletRequest.getRequestURI();
        String savePath;
        System.out.println(uri);
        String fileType = uri.substring(uri.lastIndexOf("/"));
        System.out.println(fileType);
        if (fileType.contains("logo")) {

            savePath = "D:\\image\\company-logo";
        } else if (fileType.contains("background")) {
            savePath = "D:\\image\\company-background";
        } else {
            throw new RuntimeException("不支持");
        }

        //判断文件类型
        if (!(uploadFile.getOriginalFilename().endsWith(".jpg") || uploadFile.getOriginalFilename().endsWith(".png"))) {
            throw new RuntimeException("檔案類型只准png跟jpg");
        }

        Optional<CompanyAboutBasic> companyOptional = companyAboutBsicRepository.findById(companyId);
        if (companyOptional.isPresent()) {
            CompanyAboutBasic companyAboutBasic = companyOptional.get();
            try {
                if(fileType.contains("logo") && companyAboutBasic.getCompanyAboutLogoSavePath() != null&& companyAboutBasic.getCompanyAboutLogoImageUrl()!= null){
                    deleteFile(companyAboutBasic.getCompanyAboutLogoSavePath());
                }else if(fileType.contains("background")&& companyAboutBasic.getCompanyAboutBackgroundImageUrl()!= null&& companyAboutBasic.getCompanyAboutBackgroundSavePath()!=null){
                    deleteFile(companyAboutBasic.getCompanyAboutBackgroundSavePath());
                }

                ImageDto imageDto = fileTransferTo(savePath, uploadFile, httpServletRequest);
                updateCompanyImage( companyAboutBasic,  fileType,  imageDto);
            } catch (IOException ex) {
                throw new RuntimeException("上船失敗", ex);
            }
        }else {
            try {
                ImageDto imageDto = fileTransferTo(savePath, uploadFile, httpServletRequest);

                createCompanyImage( companyId,  fileType,  imageDto);
            } catch (IOException ex) {
                throw new RuntimeException("上船失敗", ex);
            }

        }
        RestDto restDto = RestDto.builder()
                .data(companyId)
                .message("上傳成功")
                .build();

        return restDto;
    }
    private void deleteFile(String imageRealPath) {
        System.out.println(imageRealPath);
        File file = new File(imageRealPath);
        System.out.println("File:"+file);
        if(file.exists()){
            file.delete();
        }

    }

    private void updateCompanyImage(CompanyAboutBasic companyAboutBasic, String fileType, ImageDto imageDto) {
        if (fileType.contains("logo")) {
            companyAboutBasic.setCompanyAboutLogoImageUrl(imageDto.getUrl());
            companyAboutBasic.setCompanyAboutLogoSavePath(imageDto.getPath());
        } else if (fileType.contains("background")) {
            companyAboutBasic.setCompanyAboutBackgroundImageUrl(imageDto.getUrl());
            companyAboutBasic.setCompanyAboutBackgroundSavePath(imageDto.getPath());
        }
        companyAboutBsicRepository.save(companyAboutBasic);
    }
    private void createCompanyImage(String companyId, String fileType, ImageDto imageDto) {
        CompanyAboutBasic companyAboutBasic = CompanyAboutBasic.builder()
                .companyId(companyId)
                .build();
        if (fileType.contains("logo")) {
            companyAboutBasic.setCompanyAboutLogoImageUrl(imageDto.getUrl());
            companyAboutBasic.setCompanyAboutLogoSavePath(imageDto.getPath());
        } else if (fileType.contains("background")) {
            companyAboutBasic.setCompanyAboutBackgroundImageUrl(imageDto.getUrl());
            companyAboutBasic.setCompanyAboutBackgroundSavePath(imageDto.getPath());
        }
        companyAboutBsicRepository.save(companyAboutBasic);
    }
    private ImageDto fileTransferTo(String path, MultipartFile uploadFile, HttpServletRequest httpServlet) throws IOException {
        Path path1 = Paths.get(path);
        String name = uploadFile.getOriginalFilename();
        String prefix = name.lastIndexOf(".") != -1 ? name.substring(name.lastIndexOf(".")) : ".jpg";
        String NewFileName = UUID.randomUUID().toString().replace("-", "") + prefix;

        if (!Files.exists(path1)) {
            Files.createDirectories(path1);
        }
        File newFilePath = new File(path,NewFileName);
        String url = httpServlet.getScheme()+"://" + httpServlet.getServerName()+":"+httpServlet.getServerPort()+"/image/"+path.substring(path.lastIndexOf("\\")+1)+"/"+NewFileName;

        uploadFile.transferTo(newFilePath);
        return ImageDto.builder()
                .url(url)
                .path(newFilePath.toString())
                .build();

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

