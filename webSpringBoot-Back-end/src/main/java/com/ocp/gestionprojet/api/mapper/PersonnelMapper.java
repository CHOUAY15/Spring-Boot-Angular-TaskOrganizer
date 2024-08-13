package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;
import com.ocp.gestionprojet.api.model.entity.AdminEntity;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.MemberEntity;

@Mapper(componentModel = "spring")
@Component
public interface PersonnelMapper {

    // Manager mappings
    @Mapping(target = "departmentId", source = "department.id")
    @Mapping(target = "teamId", ignore = true)
    ManagerDto toDto(ManagerEntity managerEntity);

    // Member mappings
    @Mapping(target = "report", source = "report")
    @Mapping(target = "team", source = "team")

    MemberDto toDto(MemberEntity memberEntity);

    // Admin mappings
    PersonDto toDto(AdminEntity adminEntity);

}