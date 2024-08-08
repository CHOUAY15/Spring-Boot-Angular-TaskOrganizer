package com.ocp.gestionprojet.model.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class EmployeEntity extends Person {

    private String position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipe_id")

    private EquipeEntity equipe;

    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TacheEntity> taches=new ArrayList<>();

    @OneToOne(mappedBy = "employe")
    private RapportEntity rapport;

    


}