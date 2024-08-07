package com.ocp.gestionprojet.model.entity;

import java.util.Date;


import org.springframework.format.annotation.DateTimeFormat;

import com.ocp.gestionprojet.shared.StatutTache;

import jakarta.persistence.*;

import lombok.*;

@Data

@Entity
@Table(name = "taches")

public class TacheEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "titre", nullable = false)
    private String titre;
    @Column(name = "description", nullable = false)

    private String description;

    @Column(name = "date_debut", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd")

    private Date dateDebut=new Date();
    @Column(name = "nbr_jours", nullable = false)

    private Integer nbrJours;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutTache statut = StatutTache.A_Faire;

    @ManyToOne
    @JoinColumn(name = "employe_id", nullable = false)
    private EmployeEntity employe;

    @ManyToOne
    @JoinColumn(name = "projet_id", nullable = false)
    private ProjetEntity projet;

}

