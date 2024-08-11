package com.ocp.gestionprojet.model.entity;

import java.util.Date;

import com.ocp.gestionprojet.shared.Reactions;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data

@Entity
@Table(name = "reponses")

public class RepondreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "text", nullable = false)
    private String texte;

    @Column(name = "date_creation", nullable = false)
    private Date dateCreation=new Date();

    @Column(name = "Reaction", nullable = false)
    private Reactions reactions = Reactions.none;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commentaire_id")
    private CommentaireEntity commentaire;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chef_id")
    private ChefDequipeEntity chef;
}
