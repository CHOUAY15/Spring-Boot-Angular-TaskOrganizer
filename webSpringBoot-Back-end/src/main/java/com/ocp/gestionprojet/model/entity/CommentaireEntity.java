package com.ocp.gestionprojet.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data

@Entity
@Table(name = "commentaires")

public class CommentaireEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String texte;
    private Date dateCreation=new Date();

    @ManyToOne(fetch = FetchType.LAZY)
    private EmployeEntity employe;

    @ManyToOne(fetch = FetchType.LAZY)
    private TacheEntity tache;

    @Column(name = "important")
    private Boolean estImportant=false;

    @OneToMany(mappedBy = "commentaire", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RepondreEntity> responses = new ArrayList<>();
    

}
