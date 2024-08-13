package com.ocp.gestionprojet.api.model.dto.departmentDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DepartmentDto {
    private Integer id;
    private String name;
    private String localisation;
    private String contact;
}
