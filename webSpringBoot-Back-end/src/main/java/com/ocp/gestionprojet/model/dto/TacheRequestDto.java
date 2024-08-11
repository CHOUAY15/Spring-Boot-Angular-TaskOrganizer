package com.ocp.gestionprojet.model.dto;

import com.ocp.gestionprojet.shared.Priorite;
import com.ocp.gestionprojet.shared.StatutTache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TacheRequestDto {

    private String titre;
    private String description;
    private Integer nbrJours;
    private Priorite priorite;
    private EmployeDto employe;
    private StatutTache statut;

}
