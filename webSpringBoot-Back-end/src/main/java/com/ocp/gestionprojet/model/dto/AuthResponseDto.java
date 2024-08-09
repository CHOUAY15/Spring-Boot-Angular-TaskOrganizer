package com.ocp.gestionprojet.model.dto;

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

    public AuthResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public AuthResponseDto(String accessToken,Integer id,RolesUser role) {
     this.id=id;
     this.accessToken=accessToken;
     this.role=role;
    }

}
