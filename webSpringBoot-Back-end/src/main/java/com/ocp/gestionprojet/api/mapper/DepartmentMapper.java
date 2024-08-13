package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;

import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.departmentDto.DepartmentDto;
import com.ocp.gestionprojet.api.model.entity.DepartmentEntity;

@Mapper(componentModel = "spring")
@Component
public interface DepartmentMapper {


    DepartmentDto toDto(DepartmentEntity departmentEntity);


}