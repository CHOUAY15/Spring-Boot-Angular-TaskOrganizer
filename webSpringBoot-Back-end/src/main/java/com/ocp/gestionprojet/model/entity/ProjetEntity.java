package com.ocp.gestionprojet.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.*;

import lombok.*;

@Data


@Entity
@Table(name = "projets")

public class ProjetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_debut", nullable = false)
    private Date dateDebut=new Date();

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_fin" ,nullable=false)
    private Date dateFin;

    @Column(name = "description", nullable = false)
    private String description;
 

    @ManyToOne
    @JoinColumn(name = "equipe_id", nullable = false)
    private EquipeEntity equipe;

    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<TacheEntity> taches=new ArrayList<>();

    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<LivrableEntity> livrables=new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "chef_id", nullable = false)
    private ChefDequipeEntity chef;









}
