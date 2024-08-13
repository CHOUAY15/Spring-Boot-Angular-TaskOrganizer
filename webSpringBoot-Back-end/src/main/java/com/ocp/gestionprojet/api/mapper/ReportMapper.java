package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.reportDto.ReportDto;
import com.ocp.gestionprojet.api.model.entity.ReportEntity;

@Mapper(componentModel = "spring")
@Component
public interface ReportMapper {

    ReportDto toDto(ReportEntity rapportEntity);

 
}