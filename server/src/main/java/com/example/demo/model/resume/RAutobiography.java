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
@Table(name = "r_autobiography")
public class RAutobiography {
    @Id
    @Column(name = "id")
    public String id;
    @Column(name = "user_id")
    public String userId;
    @Column(name = "resume_id")
    public String resumeId;
    @Column(name = "chinese_autobiography")
    public String chineseAutobiography;
    @Column(name = "english_autobiography")
    public String englishAutobiography;
    @OneToOne
    @JoinColumn(name = "id",insertable = false,updatable = false)
    public Resume resume;


}
