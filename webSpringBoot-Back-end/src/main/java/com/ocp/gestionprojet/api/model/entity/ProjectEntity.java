package com.ocp.gestionprojet.api.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;


import jakarta.persistence.*;

import lombok.*;

@Data

@Entity
@Table(name = "project")

public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "creation_date", nullable = false)
    private Date startDate = new Date();

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "statuts", nullable = false)
    private boolean progressStatus =false;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private TeamEntity team;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<TaskEntity> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DeliverableEntity> deliverables = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private ManagerEntity manager;

}
