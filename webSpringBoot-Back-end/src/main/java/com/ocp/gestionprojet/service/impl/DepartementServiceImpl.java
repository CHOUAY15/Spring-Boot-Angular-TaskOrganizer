package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.mapper.DepartementMapper;
import com.ocp.gestionprojet.model.dto.DepartementDto;
import com.ocp.gestionprojet.model.entity.DepartementEntity;
import com.ocp.gestionprojet.repository.DepartementRepository;
import com.ocp.gestionprojet.service.interfaces.DepartementService;

@Service

public class DepartementServiceImpl implements DepartementService {

    @Autowired
    private DepartementRepository departementRepository;
    @Autowired
    private DepartementMapper departementMapper;

    @Override
    public List<DepartementDto> findAll() {
        return departementRepository.findAll().stream().map(entity -> departementMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public DepartementDto Save(DepartementDto departementDto) {
        DepartementEntity departementEntity=departementMapper.toEntity(departementDto);
        DepartementEntity saverdDepartementEntity=departementRepository.save(departementEntity);
        return departementMapper.toDto(saverdDepartementEntity);
       
    }

    

}
