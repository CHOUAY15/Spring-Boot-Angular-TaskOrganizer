package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.model.dto.departmentDto.DepartmentDto;

public interface DepartmentService {

    // Retrieve and return a list of all departments
    List<DepartmentDto> findAll();

    // Save a new or updated department
    DepartmentDto save(DepartmentDto departementDto);
}
