package com.example.demo.service.impl;

import com.example.demo.category.CompanyAboutBasicCategory;
import com.example.demo.category.CompanyAboutServiceCategory;
import com.example.demo.category.CompanyAboutWelfareCategory;
import com.example.demo.dao.CompanyAboutBsicRepository;
import com.example.demo.dao.CompanyAboutServiceRepository;
import com.example.demo.dao.CompanyAboutWelfareRepository;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dto.CompanyAboutDto;
import com.example.demo.dto.ImageDto;
import com.example.demo.dto.RestDto;
import com.example.demo.model.Company;
import com.example.demo.model.CompanyAboutBasic;
import com.example.demo.model.CompanyAboutWelfare;
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
    private  final CompanyAboutServiceRepository companyAboutServiceRepository;
    private final CompanyAboutWelfareRepository companyAboutWelfareRepository;
    private final CompanyRepository companyRepository;
    @Override
    public Object findAllCompanyAboutByCompanyName(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        CompanyAboutBasic companyAboutBasic = companyAboutBsicRepository.findById(companyId).orElse(new CompanyAboutBasic());
        com.example.demo.model.CompanyAboutService companyAboutService = companyAboutServiceRepository.findById(companyId).orElse(new com.example.demo.model.CompanyAboutService());
        CompanyAboutWelfare companyAboutWelfare = companyAboutWelfareRepository.findById(companyId).orElse(new CompanyAboutWelfare());
        CompanyAboutDto dto = CompanyAboutDto.builder()
                .companyId(companyId)
                .aboutUrl(companyAboutBasic.getCompanyAboutUrl())
                .employeeQuantity(companyAboutBasic.getCompanyAboutEmployeeQuantity())
                .haveMoney(companyAboutBasic.getCompanyAboutHaveMoney())
                .backgroundImageUrl(companyAboutBasic.getCompanyAboutBackgroundImageUrl())
                .talk(companyAboutBasic.getCompanyAboutTalk())
                .contactPerson(companyAboutBasic.getCompanyAboutContactPerson())
                .logoImageUrl(companyAboutBasic.getCompanyAboutLogoImageUrl())
                .environment(companyAboutBasic.getCompanyAboutEnvironment())
                .logoSavePath(companyAboutBasic.getCompanyAboutLogoSavePath())
                .backgroundSavePath(companyAboutBasic.getCompanyAboutBackgroundSavePath())
                .service(companyAboutService.getCompanyAboutService())
                .mission(companyAboutService.getCompanyAboutMission())
                .media(companyAboutService.getCompanyAboutMedia())
                .twitterUrl(companyAboutService.getCompanyTwitterUrl())
                .facebookUrl(companyAboutService.getCompanyFacebookUrl())
                .instagramUrl(companyAboutService.getCompanyInstagramUrl())
                .welfare(companyAboutWelfare.getCompanyAboutWelfare())
                .build();

        return getRestDto(dto,"查詢成功");
    }
    @Override
    public Object uploadLogoImage(MultipartFile uploadFile, String companyName, HttpServletRequest httpServletRequest) {
        String companyId = findCompanyIdByCompanyName(companyName);
        return uploadImage( uploadFile,  companyId,  httpServletRequest);
    }

    @Override
    public Object uploadBackgroundImage(MultipartFile uploadFile, String companyName, HttpServletRequest httpServletRequest) {
        String companyId = findCompanyIdByCompanyName(companyName);
        return uploadImage( uploadFile,  companyId,  httpServletRequest);
    }
    @Override
    public Object findCompanyAboutBasicByCompanyName(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        CompanyAboutBasic companyAboutBasic = companyAboutBsicRepository.findById(companyId).orElse(new CompanyAboutBasic());
        return getRestDto(companyAboutBasic,"查詢成功");
    }

   
    @Override
    public Object createCompanyAboutBasic(String companyName, CompanyAboutBasicCategory companyAboutBasicCategory) {
        String companyId = findCompanyIdByCompanyName(companyName);
        CompanyAboutBasic companyAboutBasic = getCompanyAboutBasic(companyId,companyAboutBasicCategory);
        companyAboutBsicRepository.save(companyAboutBasic);
        return getRestDto(companyAboutBasic,"新增成功");
    }

    @Override
    public Object updateCompanyAboutBasic(String companyName, CompanyAboutBasicCategory companyAboutBasicCategory) {
        String companyId = findCompanyIdByCompanyName(companyName);
        Company company =companyRepository.findById(companyId).orElseThrow(()->new RuntimeException("沒有此公司"));
        company.setCompanyNumber(companyAboutBasicCategory.getCompanyNumber());
        company.setCompanyName(companyAboutBasicCategory.getCompanyName());
        companyRepository.save(company);
        CompanyAboutBasic companyAboutBasic = getCompanyAboutBasic(companyId,companyAboutBasicCategory);
        companyAboutBsicRepository.save(companyAboutBasic);
        return getRestDto(companyAboutBasic,"更新成功");
    }

    @Override
    public Object deleteCompanyAboutBasic(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        companyAboutBsicRepository.deleteById(companyId);
        return getRestDto(companyId,"刪除成功");
    }

    @Override
    public Object findCompanyAboutWelfareByCompanyName(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        CompanyAboutWelfare companyAboutWelfare = companyAboutWelfareRepository.findById(companyId).orElse(new CompanyAboutWelfare());

        return getRestDto(companyAboutWelfare,"查詢成功");
    }



    @Override
    public Object createCompanyAboutWelfare(String companyName, CompanyAboutWelfareCategory companyAboutWelfareCategory) {
        String companyId = findCompanyIdByCompanyName(companyName);
        CompanyAboutWelfare companyAboutWelfare=getCompanyAboutWelfare(companyId,companyAboutWelfareCategory);
        companyAboutWelfareRepository.save(companyAboutWelfare);
        return getRestDto(companyAboutWelfare,"新增成功");
    }

    @Override
    public Object updateCompanyAboutWelfare(String companyName, CompanyAboutWelfareCategory companyAboutWelfareCategory) {
        String companyId = findCompanyIdByCompanyName(companyName);
        CompanyAboutWelfare companyAboutWelfare=getCompanyAboutWelfare(companyId,companyAboutWelfareCategory);
        companyAboutWelfareRepository.save(companyAboutWelfare);
        return getRestDto(companyAboutWelfare,"更新成功");
    }

    @Override
    public Object deleteCompanyAboutWelfare(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        companyAboutWelfareRepository.deleteById(companyId);
        return getRestDto(companyId,"刪除成功");
    }


    @Override
    public Object findCompanyAboutServiceByCompanyName(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        com.example.demo.model.CompanyAboutService companyAboutService =companyAboutServiceRepository.findById(companyId).orElse(new com.example.demo.model.CompanyAboutService());
        return getRestDto(companyAboutService,"查詢成功");
    }

    @Override
    public Object createCompanyAboutService(String companyName, CompanyAboutServiceCategory companyAboutBasicCategory) {
        String companyId = findCompanyIdByCompanyName(companyName);
        com.example.demo.model.CompanyAboutService companyAboutService = getCompanyAboutService(companyId,companyAboutBasicCategory);
        companyAboutServiceRepository.save(companyAboutService);
        return  getRestDto(companyAboutService,"新增成功");
    }

    @Override
    public Object updateCompanyAboutService(String companyName, CompanyAboutServiceCategory companyAboutBasicCategory) {
        String companyId = findCompanyIdByCompanyName(companyName);
        com.example.demo.model.CompanyAboutService companyAboutService = getCompanyAboutService(companyId,companyAboutBasicCategory);
        companyAboutServiceRepository.save(companyAboutService);
        return  getRestDto(companyAboutService,"更新成功");
    }

    @Override
    public Object deleteCompanyAboutService(String companyName) {
        String companyId = findCompanyIdByCompanyName(companyName);
        companyAboutServiceRepository.deleteById(companyId);
        return getRestDto(companyId,"刪除成功");
    }

    private String findCompanyIdByCompanyName(String companyName) {
        Company company  = companyRepository.findByCompanyName(companyName).orElseThrow(()->new RuntimeException("沒有此公司"));
        return company.getCompanyId();
    }

    private CompanyAboutWelfare getCompanyAboutWelfare(String companyId, CompanyAboutWelfareCategory companyAboutWelfareCategory) {
        CompanyAboutWelfare companyAboutWelfare = CompanyAboutWelfare.builder()
                .companyId(companyId)
                .companyAboutWelfare(companyAboutWelfareCategory.getCompanyAboutWelfare())
                .build();
        return companyAboutWelfare;
    }

    private com.example.demo.model.CompanyAboutService getCompanyAboutService(String companyId, CompanyAboutServiceCategory companyAboutBasicCategory) {
        System.out.println(companyAboutBasicCategory.getCompanyAboutService());
        com.example.demo.model.CompanyAboutService companyAboutService = com.example.demo.model.CompanyAboutService.builder()
                .companyId(companyId)
                .companyAboutService(companyAboutBasicCategory.getCompanyAboutService())
                .companyAboutMission(companyAboutBasicCategory.getCompanyAboutMission())
                .companyAboutMedia(companyAboutBasicCategory.getCompanyAboutMedia())
                .companyTwitterUrl(companyAboutBasicCategory.getCompanyTwitterUrl())
                .companyFacebookUrl(companyAboutBasicCategory.getCompanyFacebookUrl())
                .companyInstagramUrl(companyAboutBasicCategory.getCompanyInstagramUrl())
                .build();
        return companyAboutService;
    }


    private CompanyAboutBasic getCompanyAboutBasic(String companyId,CompanyAboutBasicCategory companyAboutBasicCategory) {
        CompanyAboutBasic companyAboutBasic = CompanyAboutBasic.builder()
                .companyId(companyId)
                .companyAboutUrl(companyAboutBasicCategory.getCompanyAboutUrl())
                .companyAboutEmployeeQuantity(companyAboutBasicCategory.getCompanyAboutEmployeeQuantity())
                .companyAboutHaveMoney(companyAboutBasicCategory.getCompanyAboutHaveMoney())
                .companyAboutBackgroundImageUrl(null)
                .companyAboutTalk(companyAboutBasicCategory.getCompanyAboutTalk())
                .companyAboutContactPerson(companyAboutBasicCategory.getCompanyAboutContactPerson())
                .companyAboutLogoImageUrl(null)
                .companyAboutEnvironment(companyAboutBasicCategory.getCompanyAboutEnvironment())
                .companyAboutLogoSavePath(null)
                .companyAboutBackgroundSavePath(null)
                .companyAboutContactNumber(companyAboutBasicCategory.getCompanyAboutContactNumber())
                .build();
        return companyAboutBasic;
    }
    private RestDto getRestDto(Object o,String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }

    private RestDto uploadImage(MultipartFile uploadFile, String companyId, HttpServletRequest httpServletRequest){
        String uri = httpServletRequest.getRequestURI();
        String savePath;
        System.out.println(uri);
        String fileType = uri.substring(uri.lastIndexOf("/"));
        System.out.println(fileType);
        if (fileType.contains("logo")) {

            savePath = "C:\\pccu-image\\company-logo";
        } else if (fileType.contains("background")) {
            savePath = "C:\\pccu-image\\company-background";
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

