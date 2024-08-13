package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ocp.gestionprojet.api.model.dto.taskDto.TaskResponseDto;
import com.ocp.gestionprojet.api.model.entity.TaskEntity;

@Mapper(componentModel = "spring")
public interface TaskMapper {


    @Mapping(target = "membre", source = "member")
    TaskResponseDto toDto(TaskEntity entity);

   
}