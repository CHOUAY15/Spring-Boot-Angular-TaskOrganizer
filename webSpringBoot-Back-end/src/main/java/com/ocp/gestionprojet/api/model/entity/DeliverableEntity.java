package com.ocp.gestionprojet.api.model.entity;



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
@Table(name = "deliverable")

public class DeliverableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "path", nullable = false)
    private String path;
    
    @ManyToOne
    @JoinColumn(name = "project", nullable = false)
    private ProjectEntity project;

}
