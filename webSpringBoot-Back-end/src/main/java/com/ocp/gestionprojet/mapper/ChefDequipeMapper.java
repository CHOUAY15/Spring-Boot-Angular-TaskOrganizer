package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
@Component

@Mapper(componentModel = "spring")

public interface ChefDequipeMapper {

    @Mapping(target = "departementId", source = "departement.id")
    ChefDequipeDto toDto(ChefDequipeEntity chefDequipeEntity);

    @Mapping(target = "equipes", ignore = true)
    @Mapping(target = "departement", ignore = true)
    ChefDequipeEntity toEntity(ChefDequipeDto chefDequipeDto);
    
}
