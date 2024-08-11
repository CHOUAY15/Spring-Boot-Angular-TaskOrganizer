package com.ocp.gestionprojet.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CommentaireRequestDto {
    private String texte;
    private Integer idEmploye;
    private Integer idTache; 
    private Boolean estImportant;

}
