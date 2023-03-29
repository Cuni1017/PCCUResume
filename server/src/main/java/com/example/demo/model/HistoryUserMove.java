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
@Table(name = "history_user_move")
public class HistoryUserMove {
    @Id
    @Column(name = "user_id")
    private String userId;
    @Column(name = "vacancies_id")
    private String vacanciesId;
    @Column(name = "move_type")
    private String moveType;
    @Column(name = "create_time")
    private LocalDate createTime;
}
