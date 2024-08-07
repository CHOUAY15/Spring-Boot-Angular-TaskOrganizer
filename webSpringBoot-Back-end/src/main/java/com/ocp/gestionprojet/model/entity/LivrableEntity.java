package com.ocp.gestionprojet.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "livrables")

public class LivrableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nom", nullable = false)
    private String nom;
    @Column(name = "path", nullable = false)
    private String path;
    
    @ManyToOne
    @JoinColumn(name = "projet_id", nullable = false)
    private ProjetEntity projet;



}
