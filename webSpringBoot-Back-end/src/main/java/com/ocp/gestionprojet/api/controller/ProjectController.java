package com.ocp.gestionprojet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectRequestDto;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectResponseDto;
import com.ocp.gestionprojet.api.service.interfaces.ProjetService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/projects")
public class ProjectController {

    @Autowired
    private ProjetService projetService;

    /**
     * Retrieves a list of projects associated with a specific team.
     *
     * @param teamId ID of the team whose projects are to be retrieved.
     * @return ResponseEntity with a list of ProjectResponseDto objects and HTTP status 200 OK.
     */
    @GetMapping("/teamId/{teamId}")
    public ResponseEntity<List<ProjectResponseDto>> findByTeam(@PathVariable("teamId") Integer teamId) {
        // Call the service method to find projects by team ID and return the result with HTTP 200 status
        return new ResponseEntity<>(projetService.findByTeam(teamId), HttpStatus.OK);
    }

    /**
     * Adds a new project to a team.
     *
     * @param projectRequestDto DTO containing the details of the project to be added.
     * @return ResponseEntity with the saved ProjectResponseDto and HTTP status 201 Created.
     * @throws EntityNotFoundException if the team associated with the project is not found.
     */
    @PostMapping("")
    public ResponseEntity<ProjectResponseDto> addProjectToTeam(@Valid @RequestBody ProjectRequestDto projectRequestDto) throws EntityNotFoundException {
        // Call the service method to add the project and return the result with HTTP 201 status
        ProjectResponseDto savedProjectDto = projetService.addProjectToTeam(projectRequestDto);
        return new ResponseEntity<>(savedProjectDto, HttpStatus.CREATED);
    }

    /**
     * Updates an existing project.
     *
     * @param id ID of the project to be updated.
     * @param projectRequestDto DTO containing the new details of the project.
     * @return ResponseEntity with the updated ProjectResponseDto and HTTP status 202 Accepted.
     * @throws EntityNotFoundException if the project with the specified ID is not found.
     */
    @PutMapping("/id/{id}")
    public ResponseEntity<ProjectResponseDto> update(@PathVariable("id") Integer id, @Valid @RequestBody ProjectRequestDto projectRequestDto) throws EntityNotFoundException {
        // Call the service method to update the project and return the result with HTTP 202 status
        ProjectResponseDto updatedProjectDto = projetService.update(projectRequestDto, id);
        return new ResponseEntity<>(updatedProjectDto, HttpStatus.ACCEPTED);
    }

    /**
     * Deletes a project by its ID.
     *
     * @param id ID of the project to be deleted.
     * @return ResponseEntity with HTTP status 204 No Content.
     */
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        // Call the service method to delete the project and return HTTP 204 status
        projetService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves a list of projects managed by a specific manager.
     *
     * @param mgrId ID of the manager whose projects are to be retrieved.
     * @return ResponseEntity with a list of ProjectResponseDto objects and HTTP status 200 OK.
     */
    @GetMapping("/mgrId/{mgrId}")
    public ResponseEntity<List<ProjectResponseDto>> findByManager(@PathVariable("mgrId") Integer mgrId) {
        // Call the service method to find projects by manager ID and return the result with HTTP 200 status
        return new ResponseEntity<>(projetService.findByManager(mgrId), HttpStatus.OK);
    }
}
