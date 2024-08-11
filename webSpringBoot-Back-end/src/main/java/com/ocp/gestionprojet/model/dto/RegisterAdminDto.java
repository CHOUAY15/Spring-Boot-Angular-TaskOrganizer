package com.ocp.gestionprojet.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterAdminDto {



    private String password;
    private PersonDto person;

    
}
