package com.ocp.gestionprojet.model.dto;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class RapportDto {

    private Integer id;
    private String nom;
    private String path;
    private Date dateCreation;
    
}
