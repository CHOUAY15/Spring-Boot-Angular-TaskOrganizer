package com.ocp.gestionprojet.model.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.ocp.gestionprojet.shared.Priorite;
import com.ocp.gestionprojet.shared.StatutTache;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateDebut;
    private Integer nbrJours;
    private StatutTache statut;
    private Priorite priorite;
    private EmployeDto employe;

}
