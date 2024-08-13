package com.ocp.gestionprojet.api.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.ocp.gestionprojet.shared.Priorite;
import com.ocp.gestionprojet.shared.StatutTache;

import jakarta.persistence.*;

import lombok.*;

@Data

@Entity
@Table(name = "task")

public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate = new Date();

    @Column(name = "day_nmbr", nullable = false)
    private Integer dayNbrs;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatutTache status = StatutTache.A_Faire;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priorite priority;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private MemberEntity member;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CommentEntity> comments = new ArrayList<>();

}
