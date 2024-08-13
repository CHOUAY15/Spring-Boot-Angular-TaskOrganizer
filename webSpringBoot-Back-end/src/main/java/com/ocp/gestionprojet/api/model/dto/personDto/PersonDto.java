package com.ocp.gestionprojet.api.model.dto.personDto;

import com.ocp.gestionprojet.shared.SexePerson;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public class PersonDto {

     private Integer id;
    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères et min est 5 caractères",min = 5)
    private String name;
    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères",min = 5)
    private String lastName;
    @Min(value = 18, message = "L'âge doit être supérieur ou égal à 18")
    @Max(value = 100, message = "L'âge doit être inférieur ou égal à 100")
    private Integer age;
    @Pattern(regexp = "^(\\+212|0)([ \\-_/]*)(\\d[ \\-_/]*){9}$", message = "format invalid")
    private String telephone;
    @Email(message = "L'adresse email n'est pas valide")
    private String email;
    @Size(max = 255, message = "L'adresse ne peut pas dépasser 255 caractères")
    private String adresse;
    private String avatar;
    @NotBlank(message = "Le cin est obligatoire")
    private String cin;
    private SexePerson gender;
    
}
