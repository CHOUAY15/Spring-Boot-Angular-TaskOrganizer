package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;

@Mapper(componentModel = "spring", uses = { PersonnelMapper.class })
@Component
public interface TeamMapper {



    @Mapping(target = "sectionName", source = "section.name")
    TeamResponseDto toDto(TeamEntity teamEntity);

   
}