package com.ocp.gestionprojet.model.dto;

import com.ocp.gestionprojet.shared.Reactions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RepondreRequestDto {

    private String texte;
    private Integer commentaireId;
    private Integer idChef;
    private Reactions reactions;

}
