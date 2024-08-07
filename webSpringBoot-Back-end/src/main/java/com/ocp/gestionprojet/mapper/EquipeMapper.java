package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.EquipeDto;
import com.ocp.gestionprojet.model.entity.EquipeEntity;

@Mapper(componentModel = "spring")
@Component
public interface EquipeMapper {
    
    EquipeDto toDto(EquipeEntity equipeEntity);


    @Mapping(target = "employees", ignore = true)
    @Mapping(target = "departement", ignore = true)
    @Mapping(target = "chef", ignore = true)
    @Mapping(target = "projets", ignore = true)



    EquipeEntity toEntity(EquipeDto equipeDto);
}
