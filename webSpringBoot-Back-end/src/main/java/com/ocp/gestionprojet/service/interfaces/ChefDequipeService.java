package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
import com.ocp.gestionprojet.model.entity.UserEntity;

public interface ChefDequipeService {
    ChefDequipeDto findById(Integer id) throws EntityNotFoundException;

    ChefDequipeDto update(ChefDequipeDto chefDequipeDto) throws EntityNotFoundException;

    void delete(Integer id);

    ChefDequipeDto save(ChefDequipeDto chefDequipeDto);

    // ChefDequipeEntity addChefToDepartement(ChefDequipeDto chefDequipeDto, Integer deptId, UserEntity user)
    //         throws EntityNotFoundException;

    ChefDequipeEntity addChefToEquipe(ChefDequipeDto chefDequipeDto, Integer eqpId, UserEntity user)
            throws EntityNotFoundException;

    List<ChefDequipeDto> findAll();

}
