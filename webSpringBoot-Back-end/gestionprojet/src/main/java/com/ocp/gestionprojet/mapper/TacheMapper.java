package com.ocp.gestionprojet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.model.dto.TacheDto;
import com.ocp.gestionprojet.model.entity.TacheEntity;

@Mapper(componentModel = "spring")
@Component



public interface TacheMapper {


   

    TacheDto toDto(TacheEntity tacheEntity);
    @Mapping(target = "employe", ignore = true)
    @Mapping(target = "projet", ignore = true)
    TacheEntity toEntity(TacheDto tacheDto);
    
}
