package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectRequestDto;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectResponseDto;

/**
 * Interface defining the contract for managing projects within the system.
 * Provides methods for creating, updating, deleting, and retrieving projects.
 */
public interface ProjetService {

    /**
     * Updates an existing project with the given ID using the provided data.
     *
     * @param projectRequestDto The data transfer object containing the updated project details.
     * @param id The ID of the project to update.
     * @return The updated {@link ProjectResponseDto}.
     * @throws EntityNotFoundException If the project with the specified ID is not found.
     */
    ProjectResponseDto update(ProjectRequestDto projectRequestDto, Integer id) throws EntityNotFoundException;

    /**
     * Deletes a project by its ID.
     *
     * @param id The ID of the project to delete.
     */
    void delete(Integer id);

    /**
     * Adds a new project to a specified team.
     *
     * @param projetDto The data transfer object containing the details of the project to be added.
     * @return The saved {@link ProjectResponseDto}.
     * @throws EntityNotFoundException If the specified team is not found.
     */
    ProjectResponseDto addProjectToTeam(ProjectRequestDto projetDto) throws EntityNotFoundException;

    /**
     * Finds and returns a list of projects associated with a specific team.
     *
     * @param teamId The ID of the team whose projects are to be retrieved.
     * @return A list of {@link ProjectResponseDto} representing the projects of the specified team.
     */
    List<ProjectResponseDto> findByTeam(Integer teamId);

    /**
     * Finds and returns a list of projects managed by a specific manager.
     *
     * @param mgrId The ID of the manager whose projects are to be retrieved.
     * @return A list of {@link ProjectResponseDto} representing the projects managed by the specified manager.
     */
    List<ProjectResponseDto> findByManager(Integer mgrId);

    List<ProjectResponseDto> findAll();
}
