package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;

import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.sectionDto.SectionDto;
import com.ocp.gestionprojet.api.model.entity.SectionEntity;

@Mapper(componentModel = "spring")
@Component
public interface SectionMapper {


    SectionDto toDto(SectionEntity sectionEntity);


}