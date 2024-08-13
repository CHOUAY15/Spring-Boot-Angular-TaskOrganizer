package com.ocp.gestionprojet.api.model.dto.teamDto;

import java.util.Date;

import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TeamResponseDto {
    private Integer id;
    private String name;
    private String description;
    private Integer teamNbr;
    private ManagerDto manager;
    private String departmentName;
    private Date creationDate;

}
