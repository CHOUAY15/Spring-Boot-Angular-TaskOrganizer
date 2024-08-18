package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.mapper.SectionMapper;
import com.ocp.gestionprojet.api.model.dto.sectionDto.SectionDto;
import com.ocp.gestionprojet.api.model.entity.SectionEntity;
import com.ocp.gestionprojet.api.repository.SectionRepository;
import com.ocp.gestionprojet.api.service.interfaces.SectionService;

@Service
public class SectionServiceImpl implements SectionService {

    @Autowired
    private SectionRepository departmentRepository;

    @Autowired
    private SectionMapper departmentMapper;

   
    @Override
    @Transactional(readOnly = true)
    public List<SectionDto> findAll() {
        // Fetch all DepartmentEntity objects from the repository
        List<SectionEntity> departments = departmentRepository.findAll();

        // Convert each DepartmentEntity to DepartmentDto and collect into a list
        return departments.stream()
                .map(departmentMapper::toDto)
                .collect(Collectors.toList());
    }

   
    @Override
    @Transactional
    public SectionDto save(SectionDto departmentDto) {
        // Create a new DepartmentEntity and populate its fields from the DTO
        SectionEntity department = new SectionEntity();
        department.setName(departmentDto.getName());
  

        // Save the DepartmentEntity to the repository
        SectionEntity savedDepartment = departmentRepository.save(department);

        // Convert the saved DepartmentEntity to DepartmentDto and return
        return departmentMapper.toDto(savedDepartment);
    }

    @Override
    public void delete(Integer id) {
    departmentRepository.deleteById(id);
    }

}
