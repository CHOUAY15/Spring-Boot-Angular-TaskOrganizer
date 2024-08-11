package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.ProjetDto;
import com.ocp.gestionprojet.model.dto.ProjetRequestDto;

public interface ProjetService {
    // ProjetDto findById(Integer id) throws EntityNotFoundException;

    ProjetDto update(ProjetRequestDto projetDto,Integer id) throws EntityNotFoundException;

    void delete(Integer id);

    // ProjetDto save(ProjetDto projetDto);

    // List<ProjetDto> findAll();

    // add projet to achef

    ProjetDto addProjetToEquipe(ProjetRequestDto projetDto, Integer eqpId) throws EntityNotFoundException;

    // find by equipe
    List<ProjetDto> findByEquipe(Integer eqpId);

    // find by chef
    List <ProjetDto> findByChef(Integer chefId);

}
