package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.deliverableDto.DeliverableDto;
import com.ocp.gestionprojet.api.model.entity.DeliverableEntity;

@Mapper(componentModel = "spring")
@Component
public interface DeliverableMapper {

    DeliverableDto toDto(DeliverableEntity livrableEntity);


}