package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;

import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectResponseDto;
import com.ocp.gestionprojet.api.model.entity.ProjectEntity;

@Mapper(componentModel = "spring", uses = { DeliverableMapper.class, PersonnelMapper.class })
@Component
public interface ProjectMapper {

    ProjectResponseDto toDto(ProjectEntity projectEntity);

}