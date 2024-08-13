package com.ocp.gestionprojet.api.model.dto.commentDto;


import java.util.Date;
import java.util.List;

import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.model.dto.responseDto.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CommentResponseDto {
    private Date creationDate;
    private String texte;
    private Boolean important;
    private MemberDto member;
    private List<ResponseDto> responses;

}
