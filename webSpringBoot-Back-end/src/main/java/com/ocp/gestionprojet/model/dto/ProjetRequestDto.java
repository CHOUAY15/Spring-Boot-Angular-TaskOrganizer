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

public class ProjetRequestDto {
    private Integer id;

    private String nom;


    private Date dateFin;

    private String description;

    private List <LivrableDto> livrables;

}