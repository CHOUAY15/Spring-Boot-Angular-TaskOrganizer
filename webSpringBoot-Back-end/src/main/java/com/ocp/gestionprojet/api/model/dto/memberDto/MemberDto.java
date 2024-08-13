package com.ocp.gestionprojet.api.model.dto.memberDto;

import lombok.experimental.SuperBuilder;

import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;
import com.ocp.gestionprojet.api.model.dto.reportDto.ReportDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@NoArgsConstructor
@SuperBuilder
@Getter
@Setter

public class MemberDto extends PersonDto {

    private String position;
    private ReportDto report;
    private TeamResponseDto team;

}
