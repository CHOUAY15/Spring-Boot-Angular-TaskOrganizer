package com.ocp.gestionprojet.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class EquipeRequestDto {
    private String nom;
    private String description;
    private ChefDequipeDto chef;

}
