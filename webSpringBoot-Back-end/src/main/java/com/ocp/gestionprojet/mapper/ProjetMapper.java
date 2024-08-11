package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.ProjetDto;
import com.ocp.gestionprojet.model.dto.ProjetRequestDto;
import com.ocp.gestionprojet.model.entity.ProjetEntity;

@Mapper(componentModel = "spring", uses = { LivrableMapper.class, PersonnelMapper.class })
@Component
public interface ProjetMapper {

    ProjetDto toDto(ProjetEntity projetEntity);

    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "taches", ignore = true)
    @Mapping(target = "livrables", ignore = true)
    @Mapping(target = "chef", ignore = true)
    ProjetEntity toEntity(ProjetDto projetDto);

    @Mapping(target = "nom", source = "nom", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "description", source = "description", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "etatAvancement", source = "etatAvancement", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "dateFin", source = "dateFin", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "taches", ignore = true)
    @Mapping(target = "chef", ignore = true)
    @Mapping(target = "dateDebut", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "id", ignore = true) 
    @Mapping(target = "livrables", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)


    void updateProjetFromDto(ProjetRequestDto dto, @MappingTarget ProjetEntity entity);

}