package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.EmployeMapper;
import com.ocp.gestionprojet.model.dto.EmployeDto;
import com.ocp.gestionprojet.model.entity.EmployeEntity;
import com.ocp.gestionprojet.model.entity.EquipeEntity;
import com.ocp.gestionprojet.repository.EmployeRepository;
import com.ocp.gestionprojet.repository.EquipeRepository;
import com.ocp.gestionprojet.service.interfaces.EmployeService;

@Service
public class EmployeServiceImpl implements EmployeService {

    @Autowired
    private EmployeRepository employeRepository;
    @Autowired
    private EmployeMapper employeMapper;
    @Autowired
    EquipeRepository equipeRepository;

    @Override
    public EmployeDto findById(Integer id) throws EntityNotFoundException {
        return employeRepository.findById(id)
                .map(entity -> employeMapper.toDto(entity))
                .orElseThrow(() -> new EntityNotFoundException("employe n'est pas exist "));
    }

    @Override
    public EmployeDto update(EmployeDto employeDto) throws EntityNotFoundException {
        EmployeDto existingEmployeDto = findById(employeDto.getId());
        EmployeEntity existingEmployEntity = employeMapper.toEntity(existingEmployeDto);
        existingEmployEntity.setNom(employeDto.getNom());
        existingEmployEntity.setPrenom(employeDto.getPrenom());
        existingEmployEntity.setAge(employeDto.getAge());
        existingEmployEntity.setAdresse(employeDto.getAdresse());
        existingEmployEntity.setAvatar(employeDto.getAvatar());
        existingEmployEntity.setCin(employeDto.getCin());
        existingEmployEntity.setTelephone(employeDto.getTelephone());
        existingEmployEntity.setEmail(employeDto.getEmail());
        existingEmployEntity.setPosition(employeDto.getPosition());
        existingEmployEntity.setSexe(employeDto.getSexe());

        EmployeEntity updatedEmploye = employeRepository.save(existingEmployEntity);
        return employeMapper.toDto(updatedEmploye);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        employeRepository.deleteById(id);
    }

    @Override
    public List<EmployeDto> findEmployeByEquipeId(Integer eqpId) {
        return employeRepository.findByEquipeId(eqpId).stream().map(entity -> employeMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeDto addEmployeToEquipe(EmployeDto employeDto, Integer eqpId) throws EntityNotFoundException {
        EquipeEntity equipeEntity = equipeRepository.findById(eqpId)
                .orElseThrow(() -> new EntityNotFoundException("equipe not found with id"));
        EmployeEntity employeEntity = new EmployeEntity();
        employeEntity.setNom(employeDto.getNom());
        employeEntity.setPrenom(employeDto.getPrenom());
        employeEntity.setAge(employeDto.getAge());
        employeEntity.setAdresse(employeDto.getAdresse());
        employeEntity.setAvatar(employeDto.getAvatar());
        employeEntity.setCin(employeDto.getCin());
        employeEntity.setTelephone(employeDto.getTelephone());
        employeEntity.setEmail(employeDto.getEmail());
        employeEntity.setPosition(employeDto.getPosition());
        employeEntity.setSexe(employeDto.getSexe());
        employeEntity.setEquipe(equipeEntity);
        EmployeEntity savedEmployeEntity = employeRepository.save(employeEntity);
        return employeMapper.toDto(savedEmployeEntity);
    }

}
