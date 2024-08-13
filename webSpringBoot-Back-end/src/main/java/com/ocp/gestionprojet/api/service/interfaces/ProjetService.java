package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectRequestDto;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectResponseDto;

public interface ProjetService {

    // Update an existing project with the given ID using the provided data
    ProjectResponseDto update(ProjectRequestDto projectRequestDto, Integer id) throws EntityNotFoundException;

    // Delete a project by its ID
    void delete(Integer id);

    // Add a new project to a specified team
    ProjectResponseDto addProjectToTeam(ProjectRequestDto projetDto) throws EntityNotFoundException;

    // Find and return a list of projects associated with a specific team
    List<ProjectResponseDto> findByTeam(Integer teamId);

    // Find and return a list of projects managed by a specific manager
    List<ProjectResponseDto> findByManager(Integer mgrId);
}
