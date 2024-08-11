package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.EquipeDto;
import com.ocp.gestionprojet.model.entity.EquipeEntity;

@Mapper(componentModel = "spring", uses = {PersonnelMapper.class, DepartementMapper.class})
@Component
public interface EquipeMapper {

    @Mapping(target = "chef", source = "chef")
    @Mapping(target = "nomDepartement",  source = "departement.nom")
    EquipeDto toDto(EquipeEntity equipeEntity);

    @Mapping(target = "employees", ignore = true)
    @Mapping(target = "projets", ignore = true)
    @Mapping(target = "chef", source = "chef")
    @Mapping(target = "departement", ignore = true)
    EquipeEntity toEntity(EquipeDto equipeDto);
}