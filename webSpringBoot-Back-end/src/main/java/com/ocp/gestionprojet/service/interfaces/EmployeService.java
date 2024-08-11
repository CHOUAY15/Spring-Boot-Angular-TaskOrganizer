package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.EmployeDto;
import com.ocp.gestionprojet.model.entity.EmployeEntity;
import com.ocp.gestionprojet.model.entity.UserEntity;

public interface EmployeService {

    EmployeDto findById(Integer id) throws EntityNotFoundException;

    EmployeDto update(EmployeDto employeDto) throws EntityNotFoundException;

    void delete(Integer id);

    EmployeEntity addEmployeToEquipe(EmployeDto employeDto, Integer eqpId , UserEntity user) throws EntityNotFoundException;

    List<EmployeDto> findEmployeByEquipeId(Integer eqpId);

    List<EmployeDto> findByChef(Integer chefId);
}
