package com.ocp.gestionprojet.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterEmployeDto {



    private EmployeDto employeDto;
    private String password;

    
}
