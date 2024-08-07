package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.ChefDequipeDto;

public interface ChefDequipeService {
    ChefDequipeDto findById(Integer id) throws EntityNotFoundException;

    ChefDequipeDto update(ChefDequipeDto chefDequipeDto) throws EntityNotFoundException;

    void delete(Integer id);

    ChefDequipeDto save(ChefDequipeDto chefDequipeDto);
    ChefDequipeDto addChefToDepartement(ChefDequipeDto chefDequipeDto, Integer deptId) throws EntityNotFoundException;


    List<ChefDequipeDto> findAll();

}
