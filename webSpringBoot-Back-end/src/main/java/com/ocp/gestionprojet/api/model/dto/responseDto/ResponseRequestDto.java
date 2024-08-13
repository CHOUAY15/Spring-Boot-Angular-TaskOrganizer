package com.ocp.gestionprojet.api.model.dto.responseDto;

import com.ocp.gestionprojet.shared.Reactions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ResponseRequestDto {

    private String texte;
    private Integer commentId;
    private Integer senderId;
    private Reactions reaction;
    

}
