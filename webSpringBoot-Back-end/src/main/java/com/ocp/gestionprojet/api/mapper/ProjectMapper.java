package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectResponseDto;
import com.ocp.gestionprojet.api.model.entity.ProjectEntity;

@Mapper(componentModel = "spring", uses = { DeliverableMapper.class, PersonnelMapper.class })
@Component
public interface ProjectMapper {



   @Mapping(target = "teamName", source = "team.name")
    ProjectResponseDto toDto(ProjectEntity projectEntity);

}