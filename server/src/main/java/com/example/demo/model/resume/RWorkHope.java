package com.example.demo.model.resume;

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
@Table(name = "r_work_hope")
public class RWorkHope {
    @Id
    @Column(name = "work_hope_id")
    public String id;
    @Column(name = "user_id")
    public String userId;
    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "type")
    public String type;
    @Column(name = "date")
    public String date;
//    @OneToOne
//    @JoinColumn(name = "work_hope_id",insertable = false,updatable = false)
//    public Resume resume;
}
