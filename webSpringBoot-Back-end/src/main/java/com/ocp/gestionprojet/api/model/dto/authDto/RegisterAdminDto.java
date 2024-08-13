package com.ocp.gestionprojet.api.model.dto.authDto;


import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;

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
