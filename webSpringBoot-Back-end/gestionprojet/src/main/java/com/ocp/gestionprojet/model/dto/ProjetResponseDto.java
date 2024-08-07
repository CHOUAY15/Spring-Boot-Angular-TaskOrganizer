package com.ocp.gestionprojet.model.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ProjetResponseDto {
    private String nom;
    private Date dateDebut;
    private List <LivrableDto> livrables;
    private String description;

}
