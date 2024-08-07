package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.TacheMapper;
import com.ocp.gestionprojet.model.dto.TacheDto;
import com.ocp.gestionprojet.model.entity.EmployeEntity;
import com.ocp.gestionprojet.model.entity.ProjetEntity;
import com.ocp.gestionprojet.model.entity.TacheEntity;
import com.ocp.gestionprojet.repository.EmployeRepository;
import com.ocp.gestionprojet.repository.ProjetRepository;
import com.ocp.gestionprojet.repository.TacheRepository;
import com.ocp.gestionprojet.service.interfaces.TacheService;

@Service

public class TacheServiceImpl implements TacheService {

    @Autowired
    private TacheRepository tacheRepository;
    @Autowired
    private TacheMapper tacheMapper;
    @Autowired
    private EmployeRepository employeRepository;
    @Autowired
    private ProjetRepository projetRepository;

    @Override
    public TacheDto findById(Integer id) throws EntityNotFoundException {
        return tacheRepository.findById(id)
                .map(entity -> tacheMapper.toDto(entity))
                .orElseThrow(() -> new EntityNotFoundException("tache n'est pas existe"));
    }

    @Override
    public TacheDto update(TacheDto tacheDto) throws EntityNotFoundException {
        TacheEntity existingTacheEntity = tacheRepository.findById(tacheDto.getId())
            .orElseThrow(() -> new EntityNotFoundException("Tache not found with id: " + tacheDto.getId()));
        
        existingTacheEntity.setStatut(tacheDto.getStatut());
        
        TacheEntity updatedTache = tacheRepository.save(existingTacheEntity);
        return tacheMapper.toDto(updatedTache);
    }

    @Override
    public void delete(Integer id) {
        tacheRepository.deleteById(id);
    }

    @Override
    public TacheDto save(TacheDto tacheDto) {
        TacheEntity employeEntity = tacheMapper.toEntity(tacheDto);
        TacheEntity employeEntitySaved = tacheRepository.save(employeEntity);
        return tacheMapper.toDto(employeEntitySaved);
    }

    @Override
    public List<TacheDto> findAll() {
        return tacheRepository.findAll()
                .stream().map(entity -> tacheMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    // add a tache to employee
    // @Override
    // public TacheDto addTacheToEmploye(TacheDto tacheDto, Integer empId) throws EntityNotFoundException {
    //     EmployeEntity employeEntity = employeRepository.findById(empId)
    //             .orElseThrow(() -> new EntityNotFoundException("employe not found with id"));
    //     TacheEntity tacheEntity = new TacheEntity();
    //     tacheEntity.setTitre(tacheDto.getTitre());
    //     tacheEntity.setDescription(tacheDto.getDescription());
    //     tacheEntity.setNbrJours(tacheDto.getNbrJours());
    //     tacheEntity.setEmploye(employeEntity);
    //     TacheEntity savedTacheEntity = tacheRepository.save(tacheEntity);
    //     return tacheMapper.toDto(savedTacheEntity);
    // }

    // find tache by employee
    @Override
    public List<TacheDto> findByEmploye(Integer empId) {
        return tacheRepository.findByEmployeId(empId)
                .stream().map(entity -> tacheMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    // add tache to ap rojet 
    @Override
    public TacheDto addTacheToProjet(TacheDto tacheDto, Integer prjtId) throws EntityNotFoundException {
        EmployeEntity employeEntity = employeRepository
                .findById(tacheDto.getEmploye().getId())
                .orElseThrow(() -> new EntityNotFoundException("employe not found"));

        ProjetEntity projetEntity = projetRepository.findById(prjtId)
                .orElseThrow(() -> new EntityNotFoundException("projet not found"));
        TacheEntity tacheEntity = new TacheEntity();
        tacheEntity.setEmploye(employeEntity);
        tacheEntity.setProjet(projetEntity);
        tacheEntity.setTitre(tacheDto.getTitre());
        tacheEntity.setNbrJours(tacheDto.getNbrJours());
        tacheEntity.setDescription(tacheDto.getDescription());
        TacheEntity savedTacheEntity = tacheRepository.save(tacheEntity);
        return tacheMapper.toDto(savedTacheEntity);

    }


    //  find tache by projet
    @Override
    public List<TacheDto> findByProjets(Integer prjtId) {
        return tacheRepository.findByProjetId(prjtId)
        .stream().map(entity -> tacheMapper.toDto(entity))
        .collect(Collectors.toList());
    }

}
