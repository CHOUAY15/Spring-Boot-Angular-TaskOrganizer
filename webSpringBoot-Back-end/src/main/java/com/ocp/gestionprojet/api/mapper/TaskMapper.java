package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.taskDto.TaskRequestDto;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskResponseDto;
import com.ocp.gestionprojet.api.model.entity.TaskEntity;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@Component
public interface TaskMapper {

    @Mapping(target = "membre", source = "member")
    TaskResponseDto toDto(TaskEntity entity);

    // Method to update TaskEntity with non-null properties from TaskRequestDto
    @Mapping(target = "id", ignore = true) // Ensure ID is not updated
    void updateEntityFromDto(TaskRequestDto dto, @MappingTarget TaskEntity entity);
}
