package com.ocp.gestionprojet.api.model.dto.managerDto;



import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@SuperBuilder
public class ManagerDto extends PersonDto {
    private Integer departmentId;
    private Integer teamId;
    
}
