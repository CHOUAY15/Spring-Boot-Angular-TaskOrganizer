package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;

/**
 * Interface defining the contract for managing managers within the system.
 * Provides methods for creating, updating, deleting, and retrieving managers.
 */
public interface ManagerService {

    /**
     * Finds and returns a manager by their ID.
     *
     * @param id The ID of the manager to retrieve.
     * @return The {@link ManagerDto} representing the manager.
     * @throws EntityNotFoundException If the manager with the specified ID is not found.
     */
    ManagerDto findById(Integer id) throws EntityNotFoundException;

    /**
     * Updates an existing manager with the provided data.
     *
     * @param managerDto The data transfer object containing the updated manager details.
     * @return The updated {@link ManagerDto}.
     * @throws EntityNotFoundException If the manager to be updated is not found.
     */
    ManagerDto update(ManagerDto managerDto) throws EntityNotFoundException;

    /**
     * Deletes a manager by their ID.
     *
     * @param id The ID of the manager to delete.
     */
    void delete(Integer id);

    /**
     * Adds a new manager to a specified team using the provided manager data and user entity.
     *
     * @param managerDto The data transfer object containing the manager's details.
     * @param user The {@link UserEntity} associated with the manager.
     * @return The saved {@link ManagerEntity}.
     * @throws EntityNotFoundException If the specified team is not found.
     */
    ManagerEntity addManagersToTeams(ManagerDto managerDto, UserEntity user) throws EntityNotFoundException;

    /**
     * Finds and returns a list of all managers.
     *
     * @return A list of {@link ManagerDto} representing all managers.
     */
    List<ManagerDto> findAll();

    /**
     * Finds and returns a list of managers belonging to a specific section.
     *
     * @param secId The ID of the section whose managers are to be retrieved.
     * @return A list of {@link ManagerDto} representing the managers of the specified section.
     */
    List<ManagerDto> findBySection(Integer secId);
}
