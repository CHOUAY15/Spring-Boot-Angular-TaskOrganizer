package com.ocp.gestionprojet.model.dto;

import com.ocp.gestionprojet.shared.Reactions;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepondreDto {
    private Integer id;
    private String texte;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date dateCreation;
    private Reactions reactions;
    private ChefDequipeDto sender;
}