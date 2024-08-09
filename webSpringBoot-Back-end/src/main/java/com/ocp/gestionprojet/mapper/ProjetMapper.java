package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.ProjetDto;
import com.ocp.gestionprojet.model.entity.ProjetEntity;

@Mapper(componentModel = "spring", uses = {LivrableMapper.class})
@Component
public interface ProjetMapper {

    @Mapping(target = "livrables", source = "livrables")
    ProjetDto toDto(ProjetEntity projetEntity);

    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "taches", ignore = true)
    @Mapping(target = "livrables", ignore = true)
    @Mapping(target = "chef", ignore = true)
    ProjetEntity toEntity(ProjetDto projetDto);
}