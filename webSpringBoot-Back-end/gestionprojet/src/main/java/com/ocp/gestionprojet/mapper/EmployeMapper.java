package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.EmployeDto;
import com.ocp.gestionprojet.model.entity.EmployeEntity;

@Mapper(componentModel = "spring")
@Component

public interface EmployeMapper {

    EmployeDto toDto(EmployeEntity employeEntity);

    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "taches", ignore = true)
    EmployeEntity toEntity(EmployeDto employeDto);

}
