package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.model.entity.AdminEntity;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
import com.ocp.gestionprojet.model.dto.EmployeDto;
import com.ocp.gestionprojet.model.dto.PersonDto;
import com.ocp.gestionprojet.model.entity.EmployeEntity;

@Mapper(componentModel = "spring")
@Component
public interface PersonnelMapper {

    // ChefDequipe mappings
    @Mapping(target = "departementNom", source = "departement.nom")

    ChefDequipeDto toDto(ChefDequipeEntity chefDequipeEntity);

    @Mapping(target = "equipes", ignore = true)
    @Mapping(target = "departement", ignore = true)
    @Mapping(target = "projets", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "reponses", ignore = true)


    ChefDequipeEntity toEntity(ChefDequipeDto chefDequipeDto);

    // Employe mappings
    @Mapping(target = "rapport", ignore = true)

    EmployeDto toDto(EmployeEntity employeEntity);

    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "taches", ignore = true)
    @Mapping(target = "rapport", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "commentaires", ignore = true)



    EmployeEntity toEntity(EmployeDto employeDto);

    // admin
    PersonDto toDto(AdminEntity adminEntity);

    @Mapping(target = "user", ignore = true)
    AdminEntity toEntity(PersonDto personDto);
}