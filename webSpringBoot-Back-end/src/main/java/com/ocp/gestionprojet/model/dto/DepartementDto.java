package com.ocp.gestionprojet.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DepartementDto {
    private Integer id;
    @NotBlank
    private String nom;
    private String localisation;
    private String contact;
}
