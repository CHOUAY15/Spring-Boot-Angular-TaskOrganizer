package com.ocp.gestionprojet.model.dto;

import lombok.experimental.SuperBuilder;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@NoArgsConstructor
@SuperBuilder
@Getter
@Setter

public class EmployeDto extends PersonDto {

    private String position;
    private RapportDto rapport;

}
