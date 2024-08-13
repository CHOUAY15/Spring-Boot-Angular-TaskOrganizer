package com.ocp.gestionprojet.api.model.dto.authDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LoginDto {
    private String email;
    private String password;
    
}
