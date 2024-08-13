package com.ocp.gestionprojet.api.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.*;

import lombok.*;

@Data
@Entity
@Table(name = "equipes")
@NoArgsConstructor
@AllArgsConstructor

public class TeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "creation_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date creationDate = new Date();
    @Column(name = "member_number")
    private Integer teamNbr=0;
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<MemberEntity> members = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private DepartmentEntity department;
    @ManyToOne(optional = true)
    @JoinColumn(name = "manager")
    private ManagerEntity manager;
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProjectEntity> projects = new ArrayList<>();
}
