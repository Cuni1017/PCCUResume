package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teacher_file")
public class TeacherFile {
    @Id
    @Column(name = "teacher_file_id")
    private String teacherFileId;
    @Column(name = "teacher_id")
   private String teacherId;
    @Column(name = "teacher_file_path")
   private String teacherFilePath;
    @Column(name = "teacher_file_name")
   private String teacherFileName;
    @Column(name = "teacher_file_talk")
   private String teacherFileTalk;
    @Column(name = "teacher_file_type")
   private String  teacherFileType;
    @Column(name = "teacher_file_url")
   private String teacherFileUrl;
    @Column(name = "update_time")
    private LocalDate updateTime;
    @Column(name = "create_time")
    private LocalDate createTime;
}
