package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.lang.model.element.Name;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    @Column(name="teacher_id")
    public String teacherId;
    @Column(name="teacher_username")
    public String teacherUsername;
    @Column(name="teacher_password")
    public String teacherPassword;
    @Column(name="teacher_name")
    public String teacherName;
    @Column(name="teacher_email")
    public String teacherEmail;

}
