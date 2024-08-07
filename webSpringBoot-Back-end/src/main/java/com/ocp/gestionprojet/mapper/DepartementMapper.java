package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.DepartementDto;
import com.ocp.gestionprojet.model.entity.DepartementEntity;

@Mapper(componentModel = "spring")
@Component
public interface DepartementMapper {

    DepartementDto toDto (DepartementEntity departementEntity);

    @Mapping(target = "equipes", ignore = true)
    @Mapping(target = "chefs", ignore = true)

    DepartementEntity toEntity(DepartementDto departementDto);

    
    
}
