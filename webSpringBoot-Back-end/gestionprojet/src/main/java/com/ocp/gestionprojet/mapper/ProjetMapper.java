package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.ProjetDto;
import com.ocp.gestionprojet.model.entity.ProjetEntity;

@Mapper(componentModel = "spring")
@Component

public interface ProjetMapper {

    ProjetDto toDto(ProjetEntity projetEntity);

    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "taches", ignore = true)
    @Mapping(target = "livrables", ignore = true)


    ProjetEntity toEntity(ProjetDto projetDto);

}
