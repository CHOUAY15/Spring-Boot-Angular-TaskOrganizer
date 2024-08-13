package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.mapper.DepartmentMapper;
import com.ocp.gestionprojet.api.model.dto.departmentDto.DepartmentDto;
import com.ocp.gestionprojet.api.model.entity.DepartmentEntity;
import com.ocp.gestionprojet.api.repository.DepartmentRepository;
import com.ocp.gestionprojet.api.service.interfaces.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DepartmentMapper departmentMapper;

    /**
     * Retrieves all departments from the repository.
     *
     * @return List of DepartmentDto objects representing all departments.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDto> findAll() {
        // Fetch all DepartmentEntity objects from the repository
        List<DepartmentEntity> departments = departmentRepository.findAll();

        // Convert each DepartmentEntity to DepartmentDto and collect into a list
        return departments.stream()
                .map(departmentMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Saves a new department to the repository.
     *
     * @param departmentDto DTO containing the data of the department to be saved.
     * @return DepartmentDto representing the saved department.
     */
    @Override
    @Transactional
    public DepartmentDto save(DepartmentDto departmentDto) {
        // Create a new DepartmentEntity and populate its fields from the DTO
        DepartmentEntity department = new DepartmentEntity();
        department.setName(departmentDto.getName());
        department.setLocalisation(departmentDto.getLocalisation());
        department.setContact(departmentDto.getContact());

        // Save the DepartmentEntity to the repository
        DepartmentEntity savedDepartment = departmentRepository.save(department);

        // Convert the saved DepartmentEntity to DepartmentDto and return
        return departmentMapper.toDto(savedDepartment);
    }

}
