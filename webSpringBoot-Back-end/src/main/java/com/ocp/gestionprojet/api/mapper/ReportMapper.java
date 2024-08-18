package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.reportDto.ReportDto;
import com.ocp.gestionprojet.api.model.entity.ReportEntity;

@Mapper(componentModel = "spring")
@Component
public interface ReportMapper {


 @Mapping(target = "membreId", source = "member.id")
 @Mapping(target = "projetId", source = "project.id")
 

    ReportDto toDto(ReportEntity rapportEntity);

 
}