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
@Table(name = "cv_work_hope")
public class RWorkHope {
    @Id
    @Column(name = "id")
    String id;
    @Column(name = "user_id")
    public String userId;
    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "type")
    String type;
    @Column(name = "date")
    String date;
    @ManyToOne
    @JoinColumn(name = "r_work_hope_id")
    public Resume resume;
}
