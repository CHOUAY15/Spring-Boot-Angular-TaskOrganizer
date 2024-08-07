package com.ocp.gestionprojet.model.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chefs_equipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class ChefDequipeEntity  extends Person{

    @OneToMany(mappedBy = "chef", cascade = CascadeType.ALL, orphanRemoval = true)
    private List <EquipeEntity> equipes;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private DepartementEntity departement;

    @OneToMany(mappedBy = "chef", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjetEntity> projets;



    
    
}
