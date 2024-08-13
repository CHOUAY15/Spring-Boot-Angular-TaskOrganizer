package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;

public interface ManagerService {

    // Find and return a manager by their ID
    ManagerDto findById(Integer id) throws EntityNotFoundException;

    // Update an existing manager with the provided data
    ManagerDto update(ManagerDto managerDto) throws EntityNotFoundException;

    // Delete a manager by their ID
    void delete(Integer id);

    // Add a new manager to a specified team using the provided manager data and user entity
    ManagerEntity addManagerToTeam(ManagerDto managerDto, UserEntity user) throws EntityNotFoundException;

    // Find and return a list of all managers
    List<ManagerDto> findAll();
}
