package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.EquipeDto;

public interface EquipeService {
    EquipeDto findById(Integer id) throws EntityNotFoundException;

    EquipeDto update(EquipeDto equipeDto) throws EntityNotFoundException;

    void delete(Integer id);



    List<EquipeDto> findEquipesByDepartmentId(Integer deptId);
    List<EquipeDto> findEquipesByChefId(Integer chefId);


    EquipeDto addEquipeToDepartment(EquipeDto equipeDto, Integer deptID) throws EntityNotFoundException;
    EquipeDto addEquipeToChef(EquipeDto equipeDto, Integer chefId) throws EntityNotFoundException;

}