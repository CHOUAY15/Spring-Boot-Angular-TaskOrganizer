package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.PersonnelMapper;
import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
import com.ocp.gestionprojet.api.model.entity.DepartmentEntity;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;
import com.ocp.gestionprojet.api.repository.DepartmentRepository;
import com.ocp.gestionprojet.api.repository.ManagerRepository;
import com.ocp.gestionprojet.api.service.interfaces.ManagerService;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private PersonnelMapper personnelMapper;

    @Autowired
    private DepartmentRepository departmentRepository;

    /**
     * Retrieves a manager by its ID.
     *
     * @param id ID of the manager to retrieve.
     * @return ManagerDto containing manager data.
     * @throws EntityNotFoundException if the manager with the given ID is not found.
     */
    @Override
    @Transactional(readOnly = true)
    public ManagerDto findById(Integer id) throws EntityNotFoundException {
        ManagerEntity manager = managerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Manager not found"));
        return personnelMapper.toDto(manager);
    }

    /**
     * Updates an existing manager based on the provided ManagerDto.
     *
     * @param managerDto DTO containing updated manager data.
     * @return Updated ManagerDto.
     * @throws EntityNotFoundException if the manager with the given ID is not found.
     */
    @Override
    @Transactional
    public ManagerDto update(ManagerDto managerDto) throws EntityNotFoundException {
        ManagerEntity manager = managerRepository.findById(managerDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Manager not found"));

        // Update manager properties from DTO
        updateManagerFromDto(manager, managerDto);

        // Save the updated manager entity
        ManagerEntity updatedManager = managerRepository.save(manager);
        return personnelMapper.toDto(updatedManager);
    }

    /**
     * Deletes a manager by its ID.
     *
     * @param id ID of the manager to delete.
     */
    @Override
    @Transactional
    public void delete(Integer id) {
        managerRepository.deleteById(id);
    }

    /**
     * Adds a new manager to a department based on the provided ManagerDto.
     *
     * @param managerDto DTO containing manager data and department information.
     * @param user User entity associated with the manager.
     * @return The newly created ManagerEntity.
     * @throws EntityNotFoundException if the department with the given ID is not found.
     */
    @Override
    @Transactional
    public ManagerEntity addManagerToTeam(ManagerDto managerDto, UserEntity user) throws EntityNotFoundException {
        DepartmentEntity department = departmentRepository.findById(managerDto.getDepartmentId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));

        ManagerEntity manager = new ManagerEntity();
        // Set manager properties from DTO
        updateManagerFromDto(manager, managerDto);
        manager.setDepartment(department);
        manager.setUser(user);

        // Save the new manager entity
        return managerRepository.save(manager);
    }

    /**
     * Retrieves all managers.
     *
     * @return List of ManagerDto for all managers.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ManagerDto> findAll() {
        List<ManagerEntity> managers = managerRepository.findAll();
        return managers.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Updates the properties of a ManagerEntity based on the provided ManagerDto.
     *
     * @param manager ManagerEntity to update.
     * @param dto DTO containing new manager data.
     */
    private void updateManagerFromDto(ManagerEntity manager, ManagerDto dto) {
        manager.setName(dto.getName());
        manager.setLastName(dto.getLastName());
        manager.setCin(dto.getCin());
        manager.setAge(dto.getAge());
        manager.setTelephone(dto.getTelephone());
        manager.setEmail(dto.getEmail());
        manager.setAdresse(dto.getAdresse());
        manager.setAvatar(dto.getAvatar());
        manager.setGender(dto.getGender());
    }

}
