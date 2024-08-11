package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.TacheDto;
import com.ocp.gestionprojet.model.dto.TacheRequestDto;

public interface TacheService {

    TacheDto findById(Integer id) throws EntityNotFoundException;

    TacheDto update(TacheRequestDto tacheDto, Integer id) throws EntityNotFoundException;

    void delete(Integer id);

    TacheDto save(TacheDto tacheDto);

    List<TacheDto> findAll();



    // TacheDto addTacheToProjet

    TacheDto addTacheToProjet(TacheRequestDto tacheDto, Integer prjtId)throws EntityNotFoundException;

    // find tache by employeye
    List <TacheDto> findByEmploye(Integer empId);


    // find taches by projets
    List<TacheDto> findByProjets(Integer prjtId);

}
