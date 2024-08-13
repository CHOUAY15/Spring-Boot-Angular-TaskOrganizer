package com.ocp.gestionprojet.api.model.entity;

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
@Table(name = "comment")

public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "texte")

    private String texte;
    @Column(name = "creation_date")

    private Date creationDate = new Date();

    @ManyToOne(fetch = FetchType.LAZY)
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    private TaskEntity task;

    @Column(name = "important")
    private Boolean important = false;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResponseEntity> responses = new ArrayList<>();

}
