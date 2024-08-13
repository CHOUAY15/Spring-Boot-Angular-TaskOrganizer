package com.ocp.gestionprojet.api.model.dto.responseDto;

import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
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
public class ResponseDto {
    private Integer id;
    private String texte;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date creationDate;
    private Reactions reaction;
    private ManagerDto sender;
}