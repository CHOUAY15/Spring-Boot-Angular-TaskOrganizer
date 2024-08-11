package com.ocp.gestionprojet.model.entity;

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

public class EquipeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nom", nullable = false, unique = true)
    private String nom;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "date_creation", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateCreation = new Date();
    @Column(name = "nbr_employe")
    private Integer nbrEmploye=0;
    @OneToMany(mappedBy = "equipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<EmployeEntity> employees = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private DepartementEntity departement;
    @ManyToOne(optional = true)
    @JoinColumn(name = "chef_id")
    private ChefDequipeEntity chef;
    @OneToMany(mappedBy = "equipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProjetEntity> projets = new ArrayList<>();
}
