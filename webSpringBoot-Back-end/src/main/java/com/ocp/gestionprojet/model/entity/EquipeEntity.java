package com.ocp.gestionprojet.model.entity;


import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "equipe", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<EmployeEntity> employees = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private DepartementEntity departement;
    
    @ManyToOne
    @JoinColumn(name = "chef_id", nullable = false)
    private ChefDequipeEntity chef;

    @OneToMany(mappedBy = "equipe", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<ProjetEntity> projets=new ArrayList<>();
}

