package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.EquipeMapper;
import com.ocp.gestionprojet.mapper.PersonnelMapper;
import com.ocp.gestionprojet.model.dto.EquipeDto;
import com.ocp.gestionprojet.model.dto.EquipeRequestDto;
import com.ocp.gestionprojet.model.entity.DepartementEntity;
import com.ocp.gestionprojet.model.entity.EquipeEntity;
import com.ocp.gestionprojet.repository.DepartementRepository;
import com.ocp.gestionprojet.repository.EquipeRepository;
import com.ocp.gestionprojet.service.interfaces.EquipeService;

@Service

public class EquipeServiceImpl implements EquipeService {

    @Autowired
    private EquipeMapper equipeMapper;
    @Autowired
    private EquipeRepository equipeRepository;
    @Autowired
    private DepartementRepository departementRepository;
    @Autowired
    private PersonnelMapper personnelMapper;

    // add a team to departement
    @Override
    @Transactional
    public EquipeDto addEquipeToDepartment(EquipeRequestDto equipeDto, Integer deptID) throws EntityNotFoundException {
        DepartementEntity department = departementRepository.findById(deptID)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id:"));
        EquipeEntity equipeEntity = new EquipeEntity();
        equipeEntity.setNom(equipeDto.getNom());
        equipeEntity.setDescription(equipeDto.getDescription());
        equipeEntity.setDepartement(department);
        EquipeEntity savedEquipeEntity = equipeRepository.save(equipeEntity);
        return equipeMapper.toDto(savedEquipeEntity);

    }


    @Override
    @Transactional
    public EquipeDto update(EquipeRequestDto equipeDto, Integer id) throws EntityNotFoundException {
        EquipeEntity existingEquipeEntity = equipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id:"));

        existingEquipeEntity.setNom(equipeDto.getNom());
        existingEquipeEntity.setDescription(equipeDto.getDescription());
        existingEquipeEntity.setChef(personnelMapper.toEntity(equipeDto.getChef()));
        EquipeEntity updatedEquipe = equipeRepository.save(existingEquipeEntity);
        return equipeMapper.toDto(updatedEquipe);
    }

    @Override
    public void delete(Integer id) {
        equipeRepository.deleteById(id);
    }

 

    // find equipe par chef de cette equipe,
    @Override
    @Transactional
    public List<EquipeDto> findEquipesByChefId(Integer chefId) {
        return equipeRepository.findByChefId(chefId).stream().map(entity -> equipeMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    // // add equipe to a chef
    // @Override
    // public EquipeDto addEquipeToChef(EquipeDto equipeDto, Integer chefId) throws
    // EntityNotFoundException {
    // ChefDequipeEntity chef = chefDequipeRepository.findById(chefId)
    // .orElseThrow(() -> new EntityNotFoundException("chef not found "));
    // EquipeEntity equipeEntity = new EquipeEntity();
    // equipeEntity.setNom(equipeDto.getNom());
    // equipeEntity.setDescription(equipeDto.getDescription());
    // equipeEntity.setChef(chef);
    // equipeEntity.setDepartement(chef.getDepartement());
    // EquipeEntity savedEquipeEntity = equipeRepository.save(equipeEntity);
    // return equipeMapper.toDto(savedEquipeEntity);
    // }

       // @Override
    // @Transactional
    // public List<EquipeDto> findEquipesByDepartmentId(Integer deptID) {
    //     return equipeRepository.findByDepartementId(deptID).stream().map(entity -> equipeMapper.toDto(entity))
    //             .collect(Collectors.toList());
    // }

    
    // @Override
    // public EquipeDto findById(Integer id) throws EntityNotFoundException {
    // return equipeRepository.findById(id)
    // .map(entity -> equipeMapper.toDto(entity))
    // .orElseThrow(() -> new EntityNotFoundException("equipe n'est pas exist "));
    // }

}
