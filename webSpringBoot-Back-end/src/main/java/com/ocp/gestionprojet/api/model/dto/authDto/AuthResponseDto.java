package com.ocp.gestionprojet.api.model.dto.authDto;

import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;
import com.ocp.gestionprojet.shared.RolesUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AuthResponseDto {

    private String accessToken;
    private String tokenType = "Bearer ";
    private Integer id;
    private RolesUser role;
    private PersonDto person;
    
    public AuthResponseDto(String accessToken, Integer id, RolesUser role, PersonDto person) {
        this.accessToken = accessToken;
        this.id = id;
        this.role = role;
        this.person = person;
    }

 

}
