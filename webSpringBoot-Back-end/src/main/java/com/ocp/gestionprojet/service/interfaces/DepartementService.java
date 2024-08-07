package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.model.dto.DepartementDto;

public interface DepartementService {

    List<DepartementDto> findAll();
    
    DepartementDto Save(DepartementDto departementDto);

    
}
