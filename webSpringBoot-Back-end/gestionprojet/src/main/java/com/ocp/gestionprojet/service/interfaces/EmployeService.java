package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.EmployeDto;

public interface EmployeService {

    EmployeDto findById(Integer id) throws EntityNotFoundException;

    EmployeDto update(EmployeDto employeDto) throws EntityNotFoundException;

    void delete(Integer id);


    EmployeDto addEmployeToEquipe(EmployeDto employeDto, Integer eqpId) throws EntityNotFoundException;

    List<EmployeDto> findEmployeByEquipeId(Integer eqpId);
}
