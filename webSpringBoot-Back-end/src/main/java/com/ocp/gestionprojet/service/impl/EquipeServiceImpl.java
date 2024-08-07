package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.EquipeMapper;
import com.ocp.gestionprojet.model.dto.EquipeDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
import com.ocp.gestionprojet.model.entity.DepartementEntity;
import com.ocp.gestionprojet.model.entity.EquipeEntity;
import com.ocp.gestionprojet.repository.ChefDequipeRepository;
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
    private ChefDequipeRepository chefDequipeRepository;

    @Override
    public EquipeDto findById(Integer id) throws EntityNotFoundException {
        return equipeRepository.findById(id)
                .map(entity -> equipeMapper.toDto(entity))
                .orElseThrow(() -> new EntityNotFoundException("equipe n'est pas exist "));
    }

    @Override
    public EquipeDto update(EquipeDto equipeDto) throws EntityNotFoundException {
        EquipeDto existingEquipeDto = findById(equipeDto.getId());
        EquipeEntity existingEquipeEntity = equipeMapper.toEntity(existingEquipeDto);
        existingEquipeEntity.setNom(equipeDto.getNom());
        EquipeEntity updatedEquipe = equipeRepository.save(existingEquipeEntity);
        return equipeMapper.toDto(updatedEquipe);
    }

    @Override
    public void delete(Integer id) {
        equipeRepository.deleteById(id);
    }

    @Override
    public List<EquipeDto> findEquipesByDepartmentId(Integer deptID) {
        return equipeRepository.findByDepartementId(deptID).stream().map(entity -> equipeMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public EquipeDto addEquipeToDepartment(EquipeDto equipeDto, Integer deptID) throws EntityNotFoundException {
        DepartementEntity department = departementRepository.findById(deptID)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id:"));
        EquipeEntity equipeEntity = new EquipeEntity();
        equipeEntity.setNom(equipeDto.getNom());
        equipeEntity.setDepartement(department);
        EquipeEntity savedEquipeEntity = equipeRepository.save(equipeEntity);
        return equipeMapper.toDto(savedEquipeEntity);

    }

    // find equipe par chef de cette equipe,
    @Override
    public List<EquipeDto> findEquipesByChefId(Integer chefId) {
        return equipeRepository.findByChefId(chefId).stream().map(entity -> equipeMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    // add equipe to a chef
    @Override
    public EquipeDto addEquipeToChef(EquipeDto equipeDto, Integer chefId) throws EntityNotFoundException {
        ChefDequipeEntity chef = chefDequipeRepository.findById(chefId)
                .orElseThrow(() -> new EntityNotFoundException("chef not found "));
        EquipeEntity equipeEntity = new EquipeEntity();
        equipeEntity.setNom(equipeDto.getNom());
        equipeEntity.setDescription(equipeDto.getDescription());
        equipeEntity.setChef(chef);
        equipeEntity.setDepartement(chef.getDepartement());
        EquipeEntity savedEquipeEntity = equipeRepository.save(equipeEntity);
        return equipeMapper.toDto(savedEquipeEntity);
    }

}
