package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_id")
    private String studentId;
    @Column(name = "student_name")
    private String studentName;
    @Column(name = "student_username")
    private String studentUsername;
    @Column(name = "student_password")
    private String studentPassword;
    @Column(name = "student_email")
    private String studentEmail;
    @Column(name = "student_number")
    private String studentNumber;
    @Column(name = "student_image_url")
    private String studentImageUrl;
    @Column(name = "student_image_old_name")
    private String studentImageOldName;
    @Column(name = "student_image_new_name")
    private String studentImageNewName;
    @Column(name = "pccu_id")
    private String pccuId;

}
