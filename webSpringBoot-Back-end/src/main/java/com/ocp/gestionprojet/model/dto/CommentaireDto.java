package com.ocp.gestionprojet.model.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentaireDto {
    private Integer id; 
    private String texte;
    private Date dateCreation;
    private EmployeDto sender; 
    private Boolean estImportant;
    private List<RepondreDto> responses;
}

