package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.RapportDto;
import com.ocp.gestionprojet.model.entity.RapportEntity;

@Mapper(componentModel = "spring")
@Component
public interface RapportMapper {

    RapportDto toDto(RapportEntity rapportEntity);

    @Mapping(target = "projet", ignore = true)
    @Mapping(target = "employe", ignore = true)
    RapportEntity toEntity(RapportDto rapportDto);
}