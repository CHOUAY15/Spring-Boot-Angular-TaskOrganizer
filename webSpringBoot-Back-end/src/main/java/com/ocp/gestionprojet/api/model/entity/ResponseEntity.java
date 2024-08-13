package com.ocp.gestionprojet.api.model.entity;

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
@Table(name = "reponse")

public class ResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "text", nullable = false)
    private String texte;

    @Column(name = "creation_date", nullable = false)
    private Date creationDate=new Date();

    @Column(name = "Reaction", nullable = false)
    private Reactions reaction = Reactions.none;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private CommentEntity comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private ManagerEntity manager;
}
