package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.TacheDto;

public interface TacheService {

    TacheDto findById(Integer id) throws EntityNotFoundException;

    TacheDto update(TacheDto tacheDto) throws EntityNotFoundException;

    void delete(Integer id);

    TacheDto save(TacheDto tacheDto);

    List<TacheDto> findAll();



    // TacheDto addTacheToProjet

    TacheDto addTacheToProjet(TacheDto tacheDto, Integer prjtId)throws EntityNotFoundException;

    // find tache by employeye
    List <TacheDto> findByEmploye(Integer empId);


    // find taches by projets
    List<TacheDto> findByProjets(Integer prjtId);

}
