package com.ocp.gestionprojet.api.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.ocp.gestionprojet.api.model.dto.commentDto.CommentResponseDto;
import com.ocp.gestionprojet.api.model.entity.CommentEntity;

@Mapper(componentModel = "spring", uses = {PersonnelMapper.class, ResponseMapper.class})
@Component
public interface CommentMapper {

    CommentResponseDto toDto(CommentEntity commentaireEntity);




}