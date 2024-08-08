package com.ocp.gestionprojet.model.dto;

import java.util.Date;

import com.ocp.gestionprojet.shared.StatutTache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TacheDto {

    private Integer id;
    private String titre;

    private String description;
    private Date dateDebut;
    private Integer nbrJours;
    private StatutTache statut;
    private EmployeDto employe;

}
