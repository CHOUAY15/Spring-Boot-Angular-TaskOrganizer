package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.*;

import com.ocp.gestionprojet.api.model.dto.responseDto.ResponseDto;
import com.ocp.gestionprojet.api.model.entity.ResponseEntity;

@Mapper(componentModel = "spring", uses = { PersonnelMapper.class })
public interface ResponseMapper {

    @Mapping(target = "sender", source = "manager")
    ResponseDto toDto(ResponseEntity repondreEntity);

}