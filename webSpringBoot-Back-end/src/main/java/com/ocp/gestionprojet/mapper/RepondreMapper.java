package com.ocp.gestionprojet.mapper;

import com.ocp.gestionprojet.model.dto.RepondreDto;
import com.ocp.gestionprojet.model.entity.RepondreEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = { PersonnelMapper.class })
public interface RepondreMapper {

    @Mapping(target = "sender", source = "chef")
    RepondreDto toDto(RepondreEntity repondreEntity);

    @Mapping(target = "chef", source = "sender")
    @Mapping(target = "commentaire", ignore = true)
    RepondreEntity toEntity(RepondreDto repondreDto);

    @Mapping(target = "chef", source = "sender")
    @Mapping(target = "commentaire", ignore = true)
    void updateEntityFromDto(RepondreDto repondreDto, @MappingTarget RepondreEntity repondreEntity);
}