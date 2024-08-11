package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.CommentaireDto;
import com.ocp.gestionprojet.model.entity.CommentaireEntity;

@Mapper(componentModel = "spring", uses = {PersonnelMapper.class, RepondreMapper.class})
@Component
public interface CommentaireMapper {

    @Mapping(target = "sender", source = "employe")
    CommentaireDto toDto(CommentaireEntity commentaireEntity);

    @Mapping(target = "employe", source = "sender")
    @Mapping(target = "tache", ignore = true )
    CommentaireEntity toEntity(CommentaireDto commentaireDto);
}