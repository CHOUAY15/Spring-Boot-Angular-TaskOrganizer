package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.LivrableDto;
import com.ocp.gestionprojet.model.entity.LivrableEntity;

@Mapper(componentModel = "spring")
@Component
public interface LivrableMapper {

    LivrableDto toDto(LivrableEntity livrableEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projet", ignore = true)
    LivrableEntity toEntity(LivrableDto livrableDto);
}