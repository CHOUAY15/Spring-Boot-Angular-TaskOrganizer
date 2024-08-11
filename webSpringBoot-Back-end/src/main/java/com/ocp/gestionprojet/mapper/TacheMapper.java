package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.ocp.gestionprojet.model.dto.TacheDto;
import com.ocp.gestionprojet.model.dto.TacheRequestDto;
import com.ocp.gestionprojet.model.entity.TacheEntity;

@Mapper(componentModel = "spring", uses = { PersonnelMapper.class, ProjetMapper.class })
@Component
public interface TacheMapper {

    @Mapping(target = "employe", source = "employe")
    TacheDto toDto(TacheEntity tacheEntity);

    @Mapping(target = "employe", source = "employe")
    @Mapping(target = "commentaires", ignore = true)
    @Mapping(target = "projet", ignore = true)
    @Mapping(target = "dateDebut", expression = "java(new java.util.Date())")
    TacheEntity toEntity(TacheDto tacheDto);

    // @Mapping(target = "employe", source = "employe")
    // @Mapping(target = "commentaires", ignore = true)
    // @Mapping(target = "projet", ignore = true)
    // @Mapping(target = "dateDebut", expression = "java(new java.util.Date())")
    // @Mapping(target = "id", ignore = true)
    // TacheEntity toEntity(TacheRequestDto tacheRequestDto);

    // @Mapping(target = "projet", ignore = true)
    // @Mapping(target = "commentaires", ignore = true)
    // @Mapping(target = "dateDebut", ignore = true)
    // void updateEntityFromDto(TacheDto tacheDto, @MappingTarget TacheEntity
    // tacheEntity);

    @Mapping(target = "projet",ignore = true)
    @Mapping(target = "commentaires",ignore = true)
    @Mapping(target = "dateDebut",ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "titre", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "description", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "nbrJours", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "priorite", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "employe", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "statut", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequestDto(TacheRequestDto tacheRequestDto, @MappingTarget TacheEntity tacheEntity);
}