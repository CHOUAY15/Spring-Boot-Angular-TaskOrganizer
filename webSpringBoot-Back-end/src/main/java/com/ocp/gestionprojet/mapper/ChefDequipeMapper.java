package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;

@Mapper(componentModel = "spring")
@Component
public interface ChefDequipeMapper {

    @Mapping(target = "departementId", source = "departement.id")
    ChefDequipeDto toDto(ChefDequipeEntity chefDequipeEntity);

    @Mapping(target = "equipes", ignore = true)
    @Mapping(target = "departement", ignore = true)
    @Mapping(target = "projets", ignore = true)
    ChefDequipeEntity toEntity(ChefDequipeDto chefDequipeDto);
}