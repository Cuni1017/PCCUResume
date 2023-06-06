package com.example.demo.service.impl;

import com.example.demo.category.*;
import com.example.demo.dao.*;
import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.company.CompanyDao;
import com.example.demo.dao.resume.*;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.*;
import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.dto.vacancies.PageVacanciesDto;
import com.example.demo.model.*;
import com.example.demo.model.resume.Resume;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.service.TeacherService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final ApplyRepository applyRepository;
    private final CompanyRepository companyRepository;
    private final VacanciesRepository vacanciesRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final ApplyDao applyDao;
    private final VacanciesDao vacanciesDao ;
    private final TeacherRepository teacherRepository;
    private final ResumeRepository resumeRepository;
    private final TeacherDao teacherDao;
    private final RWorkHopeRepository rWorkHopeRepository;
    private final RSpecialSkillRepository rSpecialSkillRepository;
    private final RLicenseRepository rLicenseRepository;
    private final RProjectAchievementsRepository rProjectAchievementsRepository;
    private final RAutobiographyRepository rAutobiographyRepository;
    private final RWorkExperienceRepository rWorkExperienceRepository;
    private final RSkillRepository rSkillRepository;
    private final RSubjectRepository rSubjectRepository;
    private final ResumeDao resumeDao;
    private final JavaMailSender mailSender;
    private final   HistoryApplyRepository historyApplyRepository;
    private final  StudentDao studentDao;
    private final CompanyDao companyDao;
    private final TeacherFileRepository teacherFileRepository;
    private final UserLikeRepository userLikeRepository;
    @Override
    public Object findById(String teacherId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId).orElseThrow(()->new RuntimeException("沒有此教師"));
        User user = userRepository.findById(teacherId).orElseThrow(()->new RuntimeException("沒有此使用者"));
        TeacherDto teacherDto = TeacherDto.builder()
                .teacherId(teacher.getTeacherId())
                .teacherImageUrl(teacher.getTeacherImageUrl())
                .teacherUsername(teacher.getTeacherUsername())
                .teacherName(teacher.getTeacherName())
                .teacherEmail(teacher.getTeacherEmail())
                .teacherNumber(teacher.teacherNumber)
                .role(user.getRole().toString())
                .build();
        return getRestDto(teacherDto,"查詢成功");
    }



    @Override
    public Object findNewsById() {
        LocalDate beforeFiveDay = LocalDate.now().minusDays(5);

        System.out.println(beforeFiveDay);
        List<Student> students      = studentRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.STUDENT_USER.toString());
        List<Company> companies     = companyRepository.findByCreateTimeAfterAndRole(beforeFiveDay, Role.COMPANY_USER.toString());
        List<CompanyVacanciesDto> vacancies = vacanciesDao.findApplyVacanciesByVacanciesUpdateTime(beforeFiveDay, TeacherValidType.審核中.toString());

        List<String> vacanciesIds = applyDao.findApplyVacanciesIdByApplyUpdateTime(beforeFiveDay);
        List<AllApplyDto> allApplyDtoList = new LinkedList<>();
        vacanciesIds = vacanciesIds.stream().distinct().collect(Collectors.toList());

        for(String vacanciesId : vacanciesIds){
            List<ApplyUserDto> applyUserDto = applyDao.findApplyVacanciesAndUserByVacanciesId(vacanciesId,null);
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
            AllApplyDto       allApplyDto = AllApplyDto.builder()
                    .fullVacanciesDto(fullVacanciesDto)
                    .ApplyUserDto(applyUserDto)
                    .build();
            allApplyDtoList.add(allApplyDto);
        }
        NewsDto newsDto = NewsDto.builder()
                .allApplyDtoList(allApplyDtoList)
                .students(students)
                .companies(companies)
                .CompanyVacanciesDto(vacancies)
                .build();
        return  getRestDto(newsDto,"查詢成功");
    }



    @Override
    public Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory) {
        updateRole(studentId,teacherId,roleCategory);
        return getRestDto(roleCategory.getRole(),"更新成功");
    }
    @Override
    public Object deleteStudentRole(String teacherId, String studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->new RuntimeException("沒有此學生"));
        String message = getMessage("student",student.getStudentName() ,student.getStudentEmail());
        sendApplyTypeMail("student",student.getStudentName() ,student.getStudentEmail(),message);
        List<Resume> resumes = resumeRepository.findByUserId(studentId);
        userRepository.deleteById(studentId);
        studentRepository.deleteById(studentId);
        if(resumes.isEmpty()){
            for(int i =0 ; i< resumes.size();i++){
                String resumeId = resumes.get(i).getResumeId();
                resumeRepository.deleteByUserIdAndResumeId(studentId,resumeId);
                rAutobiographyRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                rLicenseRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                rProjectAchievementsRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                rSpecialSkillRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                rWorkExperienceRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                rWorkHopeRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                rSubjectRepository.deleteByUserIdAndResumeId( studentId, resumeId );
                resumeDao.deleteByResumeId(resumeId);
            }
        }

        return getRestDto(studentId,"刪除成功");
    }



    @Override
    public Object findStudentByRole(int page , int limit,String search) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<StudentDto> StudentDtos = studentDao.findByRole(Role.STUDENT_USER.toString(),selectLimit,selectOffset,search);
        Long total = StudentDtos.stream().count();

        StudentReviewDto studentReviewDto = StudentReviewDto.builder()
                .StudentDtos(StudentDtos)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(studentReviewDto,"查詢成功");
    }

    @Override
    public Object findStudentCheckByRole(int page, int limit,String search) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<StudentDto> StudentDtos = studentDao.findByRole(Role.STUDENT.toString(),selectLimit,selectOffset,search);
        Long total = StudentDtos.stream().count();

        StudentReviewDto studentReviewDto = StudentReviewDto.builder()
                .StudentDtos(StudentDtos)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(studentReviewDto,"查詢成功");
    }


    @Override
    public Object findCompanyByRole(int page , int limit,String search) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<CompanyDto> companies = companyDao.findByRole(Role.COMPANY_USER.toString(),selectLimit,selectOffset,search);
        Long total = companies.stream().count();
        CompanyReview companyReview = CompanyReview.builder()
                .CompanyDto(companies)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(companyReview,"查詢成功");
    }

    @Override
    public Object findCompanyCheckByRole(int page, int limit , String search) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<CompanyDto> companies = companyDao.findByRole(Role.COMPANY.toString(),selectLimit,selectOffset,search);
        Long total = companies.stream().count();
        CompanyReview companyReview = CompanyReview.builder()
                .CompanyDto(companies)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(companyReview,"查詢成功");
    }



    @Override
    public Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory) {
        updateRole(companyId,teacherId,roleCategory);
        return getRestDto(roleCategory.getRole(),"更新成功");
    }
    @Override
    public Object deleteCompanyByRole(String teacherId, String companyId) {
        Company company = companyRepository.findById(companyId).orElseThrow(()->new RuntimeException("每有此公司"));
        String message = getMessage("company",company.getCompanyName() ,company.getCompanyEmail());
        sendApplyTypeMail("company",company.getCompanyName() ,company.getCompanyEmail(),message);
        userRepository.deleteById(companyId);
        companyRepository.deleteById(companyId);
        vacanciesRepository.deleteByCompanyId(companyId);
        applyRepository.deleteByCompanyId(companyId);
        return getRestDto(companyId,"刪除成功");
    }



    @Override
    public Object findVacanciesByTeacherValidType(int page , int limit, String search) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);

        List<CompanyVacanciesDto> companyVacanciesDtos = vacanciesDao.findPageVacanciesReview(selectLimit,selectOffset,search,TeacherValidType.審核中.toString());
        long total = companyVacanciesDtos.stream().count();
        int intTotal = (int)total;
        PageVacanciesDto pageVacanciesDto = PageVacanciesDto.builder()
                .companyVacanciesDto(companyVacanciesDtos)
                .page(page)
                .size(limit)
                .total(intTotal)
                .build();
        return getRestDto(pageVacanciesDto,"查詢成功");
    }
    @Override
    public Object findVacanciesCheckByTeacherValidType(int page, int limit, String search) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
//        String search = searchCategory.getSearchName();
        List<CompanyVacanciesDto> companyVacanciesDtos = vacanciesDao.findPageVacanciesReview(selectLimit,selectOffset,search,TeacherValidType.審核通過.toString());
        long total = companyVacanciesDtos.stream().count();
        int intTotal = (int)total;
        PageVacanciesDto pageVacanciesDto = PageVacanciesDto.builder()
                .companyVacanciesDto(companyVacanciesDtos)
                .page(page)
                .size(limit)
                .total(intTotal)
                .build();
        return getRestDto(pageVacanciesDto,"查詢成功");
    }



    @Override
    public Object UpdateVacanciesByTeacherValidType(String teacherId, String vacanciesId, TeacherValidTypeCategory teacherValidTypeCategory) {
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("沒有此職缺"));
        vacancies.setTeacherValidType(teacherValidTypeCategory.getTeacherValidType().toString());
        vacancies.setVacanciesUpdateTime(LocalDate.now());
        vacancies.setTeacherId(teacherId);
        vacanciesRepository.save(vacancies);

        return getRestDto(vacancies,"更新成功");
    }

    @Override
    public Object findApply( String changeApplyType,int page,int limit) {

            List<AllApplyDto> allApplyDtoList = new LinkedList<>();
            int selectOffset = getSelectOffset(page,limit);
            int selectLimit = getSelectLimit(page,limit);
            List<ApplyUserDto> applyUserDto = applyDao.findApplyVacanciesAndUserByapplyType(changeApplyType);
             System.out.println(applyUserDto);

            List<String> vacanciesIds = applyUserDto.stream().map(a->a.getVacanciesId()).distinct().collect(Collectors.toList());
            for(String vacanciesId:vacanciesIds){
                System.out.println(vacanciesId);
                List<ApplyUserDto> applyUserDtos = applyUserDto.stream().filter(s ->s.getVacanciesId() == vacanciesId).collect(Collectors.toList());
                FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
                AllApplyDto  allApplyDto = AllApplyDto.builder()
                        .fullVacanciesDto(fullVacanciesDto)
                        .ApplyUserDto(applyUserDtos)
                        .build();
                allApplyDtoList.add(allApplyDto);
            }
        long total   =allApplyDtoList.stream().count();
        List<AllApplyDto> allApplyDtoList1 = allApplyDtoList.stream().limit(selectLimit).skip(selectOffset).collect(Collectors.toList());
        ApplyReviewDto applyReviewDto = ApplyReviewDto.builder()
                .allApplyDtoList1(allApplyDtoList1)
                .limit(limit)
                .page(page)
                .total(total)
                .build();
        return getRestDto(applyReviewDto,"查詢成功");
    }
    @Override
    public Object updateApply(String teacherId,String applyId, ChangeApplyTypeCategory changeApplyTypeCategory) {
        Apply apply = applyRepository.findById(applyId).orElseThrow(()->new RuntimeException("沒有此apply"));
        Student    student      = studentRepository.findById(apply.getUserId()).orElseThrow(()->new RuntimeException("沒有此學生"));
        Vacancies  vacancies    = vacanciesRepository.findById(apply.getVacanciesId()).orElseThrow(()->new RuntimeException("沒有此職缺"));
        changeApplyType(apply,changeApplyTypeCategory.getApplyType().toString() );
        CheckApplyType(changeApplyTypeCategory.getApplyType(), apply, student,vacancies,applyId);
        return getRestDto(apply,"更新成功");
    }
    @Override
    public Object updateApplyTime(String applyId, ApplyTimeCategory applyTimeCategory) {
        Apply apply = applyRepository.findById(applyId).orElseThrow(()->new RuntimeException("沒有此apply"));
        apply.setApplyStartTime(applyTimeCategory.getApplyStartTime());
        apply.setApplyEndTime(applyTimeCategory.getApplyEndTime());
        apply.setApplyUpdateTime(LocalDate.now());
        applyRepository.save(apply);
        return getRestDto(apply,"更新成功");
    }

    @Override
    public Object findUserLike(String teacherId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId).orElseThrow(() -> new RuntimeException("找不倒教師"));
        List<UserLike> userLikes = userLikeRepository.findByUserId(teacher.getTeacherId());
        List<FullVacanciesDto> FullVacanciesDtoList = new ArrayList<>();
        for(UserLike userLike : userLikes){
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(userLike.getVacanciesId());
            FullVacanciesDtoList.add(fullVacanciesDto);
        }
        return getRestDto(FullVacanciesDtoList,"查詢成功");
    }

    @Override
    public Object createUserLike(String teacherId, String vacanciesId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId).orElseThrow(() -> new RuntimeException("找不倒教師"));
        Vacancies vacancies = vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("找不到工作"+vacanciesId));
        UserLike userLike  = UserLike.builder()
                .userId(teacher.getTeacherId())
                .companyId(vacancies.getCompanyId())
                .vacanciesId(vacancies.getVacanciesId())
                .build();
        userLikeRepository.save(userLike);
        return getRestDto(userLike,"新增成功");
    }

    @Override
    public Object deleteUserLike(String teacherId, String vacanciesId) {
        userLikeRepository.deleteByVacanciesIdAndUserId(vacanciesId,teacherId);
        return getRestDto(vacanciesId,"刪除成功");
    }

    @Override
    public Object findTeacherFileForm(String fileType, int page, int limit) {
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<TeacherFile> teacherFiles = teacherDao.findByFileType(fileType, selectLimit, selectOffset);
        RestDto restDto = getRestDto(teacherFiles,"查詢成功");
        return restDto;
    }

    @Override
    public Object createTeacherFileForm(TeacherFileCategory teacherFileCategory, String teacherId) {
        String teacherFileId = getId(teacherFileRepository,"TF",2);
        TeacherFile teacherFile = getTeacherFile(teacherFileCategory,teacherId,teacherFileId);
        teacherFile.setCreateTime(LocalDate.now());
        teacherFile.setUpdateTime(LocalDate.now());
        teacherFileRepository.save(teacherFile);
        return getRestDto(teacherFile,"創造成功");
    }
    @Override
    public Object updateTeacherFileForm(TeacherFileCategory teacherFileCategory, String teacherId, String teacherFileId) {
        TeacherFile teacherFile = getTeacherFile(teacherFileCategory,teacherId,teacherFileId);
        teacherFile.setUpdateTime(LocalDate.now());
        teacherFileRepository.save(teacherFile);
        return getRestDto(teacherFile,"更新成功");
    }

    @Override
    public Object deleteTeacherFileForm(String teacherId, String teacherFileId) {
        TeacherFile teacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("每有此教師上傳檔案"));
        System.out.println(teacherFileId);
        deleteFile(teacherFile.getTeacherFilePath());
        teacherFileRepository.deleteById(teacherFile.getTeacherFileId());
        return getRestDto(teacherFile.getTeacherId(),"刪除成功");
    }

    @Override
    public ResponseEntity<Object> downloadTeacherFile(String studentUsername, String teacherFileId, HttpServletResponse response) {
        TeacherFile teacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("沒有此檔案"));
        String filePath = teacherFile.getTeacherFilePath();
        if(filePath!=null){
            String filename  = filePath.substring(filePath.lastIndexOf("\\"));
            File file = new File(filePath);
            FileSystemResource resource = new FileSystemResource(file);

            if (resource.exists()) {
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(file.length())
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        }else{
            throw new RuntimeException("沒有此檔案");
        }

    }


    @Override
    public Object uploadTeacherFile(MultipartFile uploadFile, String teacherId, HttpServletRequest httpServletRequest) {
        String uri = httpServletRequest.getRequestURI();
        System.out.println(uri);
        String path = "C:\\pccu-image\\teacher-file";
        Path path1 = Paths.get(path);
        try {
            FileDto fileDto = uploadFile(path1,uploadFile,teacherId,httpServletRequest);
            TeacherFile teacherFile = teacherFileSaveFile(fileDto);
            String TeacherFileId = getId(teacherFileRepository,"TF",2);
            System.out.println(TeacherFileId);
            teacherFile.setTeacherFileId(TeacherFileId);
            teacherFile.setTeacherId(teacherId);
            teacherFile.setUpdateTime(LocalDate.now());
            teacherFile.setCreateTime(LocalDate.now());
            teacherFileRepository.save(teacherFile);
            return  getRestDto(teacherFile,"上傳成功");


        } catch (IOException ex) {
            throw new RuntimeException("上船失敗", ex);
        }


    }

    @Override
    public Object uploadUpdateTeacherFile(MultipartFile uploadFile, String teacherId, String teacherFileId, HttpServletRequest httpServletRequest) {
        String uri = httpServletRequest.getRequestURI();
        System.out.println(uri);
        String path = "C:\\pccu-image\\teacher-file";
        Path path1 = Paths.get(path);
        try {

            TeacherFile selectTeacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("沒有慈檔案"));
            System.out.println(selectTeacherFile.getTeacherFilePath());
            if(selectTeacherFile.getTeacherFilePath()!=null){
                deleteFile(selectTeacherFile.getTeacherFilePath());
            }

            FileDto fileDto = uploadFile(path1,uploadFile,teacherId,httpServletRequest);
            TeacherFile teacherFile = teacherFileSaveFile(fileDto);
            selectTeacherFile.setTeacherFileUrl(teacherFile.getTeacherFileUrl());
            selectTeacherFile.setTeacherFilePath(teacherFile.getTeacherFilePath());
            selectTeacherFile.setTeacherFileName(teacherFile.getTeacherFileName());
            selectTeacherFile.setUpdateTime(LocalDate.now());
            teacherFileRepository.save(selectTeacherFile);
            return  getRestDto(selectTeacherFile,"上傳成功");


        } catch (IOException ex) {
            throw new RuntimeException("上船失敗", ex);
        }
    }

    @Override
    public Object deleteTeacherFile(String teacherId, String teacherFileId) {
        System.out.println(teacherFileId);
        TeacherFile teacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("每有此教師上傳檔案"));
        deleteFile(teacherFile.getTeacherFilePath());
        teacherFile.setTeacherFilePath(null);
        teacherFile.setTeacherFileUrl(null);
        teacherFileRepository.save(teacherFile);
        return getRestDto(teacherFile.getTeacherFileId(),"檔案刪除成功");
    }




    private FileDto uploadFile(Path path1, MultipartFile uploadFile, String teacherId, HttpServletRequest httpServletRequest) throws IOException {
        FileDto fileDto = fileTransferTo(path1, uploadFile, httpServletRequest);
        return fileDto;
    }

    private TeacherFile teacherFileSaveFile(FileDto fileDto) {
        TeacherFile teacherFile = TeacherFile.builder()
                .teacherFileUrl(fileDto.getUrl())
                .teacherFilePath(fileDto.getPath())
                .teacherFileName(fileDto.getName())
                .build();
        return  teacherFile;
    }


    private FileDto fileTransferTo(Path path, MultipartFile uploadFile, HttpServletRequest httpServlet) throws IOException {

        String name = uploadFile.getOriginalFilename();
        System.out.println(name);
        String prefix = name.lastIndexOf(".") != -1 ? name.substring(name.lastIndexOf(".")) : ".txt";
        String NewFileName = UUID.randomUUID().toString().replace("-", "") + prefix;

        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        File newFilePath = new File(path.toString(),NewFileName);
        System.out.println(httpServlet.getScheme());
        System.out.println(httpServlet.getServerName());
        System.out.println(httpServlet.getServerPort());
        System.out.println(path.toString().substring(path.toString().lastIndexOf("\\")+1));
        String url = httpServlet.getScheme()+"://" + httpServlet.getServerName()+":"+httpServlet.getServerPort()+"/"+path.toString().substring(path.toString().lastIndexOf("\\")+1)+"/"+NewFileName;
        System.out.println(url);
        uploadFile.transferTo(newFilePath);
        return FileDto.builder()
                .url(url)
                .path(newFilePath.toString())
                .name(name)
                .build();

    }

    private void deleteFile(String imageRealPath) {
        System.out.println(imageRealPath);
        File file = new File(imageRealPath);
        System.out.println("File:"+file);
        if(file.exists()){
            file.delete();
        }

    }

    private Apply changeApplyType(Apply apply,String applyType) {
        apply.setApplyType(applyType);
        apply.setApplyUpdateTime(LocalDate.now());
        if(!applyType.contains("失敗")||applyType.contains("中斷")){
            applyRepository.save(apply);
        }
        return apply;
    }
    private RestDto CheckApplyType(ApplyType newApplyType, Apply apply, Student student,Vacancies vacancies,String applyId) throws MailException{
        String message = getMessage(student.getStudentName(),vacancies.getVacanciesName(), newApplyType.toString());
        switch (newApplyType){
            case 面試中:
                Apply progressApply =  changeApplyType(apply,newApplyType.toString());
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),message);
                return  getRestDto(progressApply,"更新成功");
            case 廠商中斷實習:
                Apply cutApply =  changeApplyType(apply,newApplyType.toString());
                HistoryApply historyApply = getHistoryApply(cutApply);
                historyApplyRepository.save(historyApply);
                applyRepository.deleteById(applyId);
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),message);
                return getRestDto(historyApply,"更新成功");
            case 實習中:
                Apply InApply =  changeApplyType(apply,newApplyType.toString());
                int quantity = vacancies.getVacanciesQuantity();
                vacancies.setVacanciesQuantity(quantity--);
                vacanciesRepository.save(vacancies);
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),message);
                return getRestDto(InApply,"更新成功");
            case 應徵中:
                Apply findApply = changeApplyType(apply,newApplyType.toString());
                return getRestDto(findApply,"更新成功");
            case 應徵失敗,面試失敗,待學生同意中失敗:
                Apply fileApply = changeApplyType(apply,newApplyType.toString());
                HistoryApply historyApply1 = getHistoryApply(fileApply);
                historyApplyRepository.save(historyApply1);
                applyRepository.deleteById(applyId);
                sendApplyTypeMail(student.getStudentName(),vacancies.getVacanciesName() ,student.getStudentEmail(),newApplyType.toString());
                return getRestDto(fileApply,"更新成功");
            case   待學生同意中:
                Apply sucessApply =  changeApplyType(apply,newApplyType.toString());
                return getRestDto(sucessApply,"更新成功");
            default:
                throw new RuntimeException("輸入近來不是保留詞");
        }
    }




    private void updateRole(String userId, String teacherId,RoleCategory roleCategory) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("使用者不存在"));
        if(userId.startsWith("S")){
            user.setRole(roleCategory.getRole());
        }else{
            user.setRole(roleCategory.getRole());
        }
        userRepository.save(user);

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
    private TeacherFile getTeacherFile(TeacherFileCategory teacherFileCategory, String teacherId,String teacherFileId){
        if(teacherFileRepository.findById(teacherFileId).isPresent()){

            TeacherFile teacherFile = TeacherFile.builder()
                    .teacherFileId(teacherFileId)
                    .teacherId(teacherId)
                    .teacherFileTitle(teacherFileCategory.getTeacherFileTitle())
                    .teacherFileTalk(teacherFileCategory.getTeacherFileTalk())
                    .teacherFileType(teacherFileCategory.getTeacherFileType())
                    .build();
            return teacherFile;
        }else{
            TeacherFile teacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("沒有此檔案"));
            teacherFile.setTeacherFileTitle(teacherFileCategory.getTeacherFileTitle());
            teacherFile.setTeacherFileTalk(teacherFileCategory.getTeacherFileTalk());
            teacherFile.setTeacherFileType(teacherFileCategory.getTeacherFileType());
            System.out.println(teacherFile);
            return teacherFile;
        }


    }

    private RestDto getRestDto(Object o, String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }
    private void sendApplyTypeMail(String physiognomy,String name ,String email,String message) throws MailException {

        MimeMessagePreparator messagePreparator = mimeMessage -> {

            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(MikeEmail.email.myEmail.toString());
            messageHelper.setTo(email);
            messageHelper.setSubject("pccu通知有關" + physiognomy + "實習資訊");
            messageHelper.setText(message);
        };
        mailSender.send(messagePreparator);
    }
    private String getMessage(String physiognomy,String name ,String email){
        String message = "這裡很遺憾的通知";
        message = message +"pccu實習您申請的"+ physiognomy +"帳號:" +name+"不通過已被刪除";
        return message;
    }
    private String getMessage(String physiognomy,String vacanciesName, String email, String applyType){
        if (applyType.contains("失敗")) {
            String message = "這裡很遺憾的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName +"失敗,";
            message = message +"這並不是你不夠好或是實力不足只是再不好的時機遇到我們會將您加入我們的人才儲備";
            return message;
        } else if (applyType.contains("面試")) {
            String message = "這裡很高興的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName+"通知您去面試,詳細情況公司會跟您確認";
            return message;
        } else if (applyType.contains("中斷")) {
            String message = "這裡很遺憾的通知";
            message = message + physiognomy;
            message = message +",您實習中的的實習職缺"+ vacanciesName+"中斷與您的實習合作,詳細情況公司會跟您確認";
            return message;
        }else if (applyType.contains("實習")) {
            String message = "這裡很高興的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName+"通知您去面試,詳細情況公司會跟您確認";
            return message;
        }else {
            String message = "這裡很高興的通知";
            message = message + physiognomy;
            message = message +",您應徵的實習職缺"+ vacanciesName+"成功,";
            message = message +"需要等你前往實習網站進行確認應徵動作,如沒有確認此職缺會消失";
            return message;
        }
    }
    private HistoryApply getHistoryApply(Apply apply) {
        LocalDate now = LocalDate.now();
        return HistoryApply.builder()
                .applyId(apply.getApplyId())
                .userId(apply.getUserId())
                .resumeId(apply.getResumeId())
                .vacanciesId(apply.getVacanciesId())
                .companyId(apply.getCompanyId())
                .createTime(apply.getCreateTime())
                .applyType(apply.getApplyType())
                .applyStartTime(apply.getApplyStartTime())
                .applyEndTime(apply.getApplyEndTime())
                .dieTime(now)
                .build();
    }
    private int getSelectOffset(int page,int limit){
        return (page-1)*limit;
    }
    private int getSelectLimit(int page,int limit){
        return page*limit;
    }

}
