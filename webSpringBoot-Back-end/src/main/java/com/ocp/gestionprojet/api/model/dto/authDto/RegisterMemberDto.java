package com.ocp.gestionprojet.api.model.dto.authDto;


import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterMemberDto {



    private MemberDto member;

    
}
