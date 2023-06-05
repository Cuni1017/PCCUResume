package com.example.demo.service.impl;

import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.TeacherDao;
import com.example.demo.dao.TeacherFileRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.dao.resume.ResumeRepository;
import com.example.demo.dto.FileDto;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.StudentDto;
import com.example.demo.model.CompanyAboutBasic;
import com.example.demo.model.Student;
import com.example.demo.model.TeacherFile;
import com.example.demo.model.User;
import com.example.demo.model.resume.Resume;

import com.example.demo.reponse.student.StudentResponse;
import com.example.demo.service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ResumeRepository resumeRepository;
    private final TeacherDao teacherDao;
    private final TeacherFileRepository teacherFileRepository;
    @Override
    public Object findUserById(String studentUsername) {
        User user =userRepository.findByUsername(studentUsername).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        Student student = studentRepository.findByStudentId(user.getId()).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        StudentDto studentDto = StudentDto.builder()
                .studentId(student.getStudentId())
                .studentImageUrl(student.getStudentImageUrl())
                .studentEmail(student.getStudentEmail())
                .studentName(student.getStudentName())
                .studentUsername(student.getStudentUsername())
                .pccuId(student.getPccuId())
                .role(user.getRole().toString())
                .studentNumber(student.getStudentNumber())
                .build();
        RestDto restResponse =RestDto.builder()
                .data(studentDto)
                .message("查詢成功")
                .build();
        return  restResponse;
    }

    @Override
    public Object uploadStudentImage(String studentUsername, MultipartFile uploadFile, HttpServletRequest httpServletRequest) {
        Student student =studentRepository.findByStudentUsername(studentUsername).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        if(student.getStudentImagePath() !=null && student.getStudentImageUrl()!=null){
            deleteFile(student.getStudentImagePath());
        }
        String savePath = "C:\\pccu-image\\student-image";
        try{
            FileDto fileDto = fileTransferTo( savePath,  uploadFile,  httpServletRequest);
            student.setStudentImageUrl(fileDto.getUrl());
            student.setStudentImagePath(fileDto.getPath());
            studentRepository.save(student);
            return getRestDto(student,"上傳成功");
        }catch (IOException ex) {
            throw new RuntimeException("上船失敗", ex);
        }

    }

    @Override
    public Object deleteStudentImage(String studentUsername) {
        Student student =studentRepository.findByStudentUsername(studentUsername).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        deleteFile(student.getStudentImagePath());
        student.setStudentImagePath(null);
        student.setStudentImageUrl(null);
        studentRepository.save(student);
        return getRestDto(student,"刪除成功");
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
    public ResponseEntity<Object> downloadTeacherFile(String studentUsername, String teacherFileId, HttpServletResponse response) {
        TeacherFile teacherFile = teacherFileRepository.findById(teacherFileId).orElseThrow(()->new RuntimeException("沒有此檔案"));
        String filePath = teacherFile.getTeacherFilePath();
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
    }

    private FileDto fileTransferTo(String path, MultipartFile uploadFile, HttpServletRequest httpServlet) throws IOException {
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
            return FileDto.builder()
                    .url(url)
                    .path(newFilePath.toString())
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
    private RestDto getRestDto(Object o, String message){
        RestDto restDto = RestDto.builder()
                .message(message)
                .data(o)
                .build();
        return restDto;
    }
    private int getSelectOffset(int page,int limit){
        return (page-1)*limit;
    }
    private int getSelectLimit(int page,int limit){
        return page*limit;
    }

}
