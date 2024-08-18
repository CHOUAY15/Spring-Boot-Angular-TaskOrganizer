package com.ocp.gestionprojet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamRequestDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;
import com.ocp.gestionprojet.api.service.interfaces.TeamService;

import jakarta.validation.Valid;

/**
 * Controller for managing teams within the application.
 * 
 * <p>
 * This controller exposes endpoints for CRUD operations on teams, including adding,
 * retrieving, updating, and deleting teams. It interacts with the {@link TeamService}
 * to perform these operations.
 * </p>
 */
@RestController
@RequestMapping("api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    /**
     * Adds a new team to a section.
     * 
     * @param teamRequestDto DTO containing the details of the team to be added.
     * @return ResponseEntity with the saved TeamResponseDto and HTTP status 201 Created.
     * @throws EntityNotFoundException if the section associated with the team is not found.
     */
    @PostMapping("")
    public ResponseEntity<TeamResponseDto> addTeamToSection(@Valid @RequestBody TeamRequestDto teamRequestDto)
            throws EntityNotFoundException {
        TeamResponseDto savedTeamDto = teamService.addTeamToSection(teamRequestDto);
        return new ResponseEntity<>(savedTeamDto, HttpStatus.CREATED);
    }

    /**
     * Retrieves all teams.
     * 
     * @return ResponseEntity with a list of all TeamResponseDto objects and HTTP status 200 OK.
     */
    @GetMapping("")
    public ResponseEntity<List<TeamResponseDto>> findAllTeams() {
        return new ResponseEntity<>(teamService.findAll(), HttpStatus.OK);
    }

    /**
     * Retrieves teams managed by a specific manager.
     * 
     * @param mgrId ID of the manager whose teams are to be retrieved.
     * @return ResponseEntity with a list of TeamResponseDto objects managed by the specified manager and HTTP status 200 OK.
     */
    @GetMapping("/mgrId/{mgrId}")
    public ResponseEntity<List<TeamResponseDto>> findByManager(@PathVariable("mgrId") Integer mgrId) {
        return new ResponseEntity<>(teamService.findByManager(mgrId), HttpStatus.OK);
    }

    /**
     * Updates the details of an existing team.
     * 
     * @param id ID of the team to be updated.
     * @param teamDto DTO containing the new details of the team.
     * @return ResponseEntity with the updated TeamResponseDto and HTTP status 202 Accepted.
     * @throws EntityNotFoundException if the team with the specified ID is not found.
     */
    @PutMapping("/id/{id}")
    public ResponseEntity<TeamResponseDto> update(@PathVariable("id") Integer id,
            @Valid @RequestBody TeamRequestDto teamDto)
            throws EntityNotFoundException {
        TeamResponseDto updatedTeam = teamService.update(teamDto, id);
        return new ResponseEntity<>(updatedTeam, HttpStatus.ACCEPTED);
    }

    /**
     * Deletes a team by its ID.
     * 
     * @param id ID of the team to be deleted.
     * @return ResponseEntity with HTTP status 204 No Content.
     */
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        teamService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves teams by section ID.
     * 
     * @param secId ID of the section whose teams are to be retrieved.
     * @return ResponseEntity with a list of TeamResponseDto objects belonging to the specified section and HTTP status 200 OK.
     */
    @GetMapping("/secId/{secId}")
    public ResponseEntity<List<TeamResponseDto>> findBySection(@PathVariable("secId") Integer secId) {
        return new ResponseEntity<>(teamService.findBySection(secId), HttpStatus.OK);
    }
      @GetMapping("/id/{id}")
    public ResponseEntity<TeamResponseDto> findById(@PathVariable("id") Integer id) throws EntityNotFoundException {
        TeamResponseDto teamDto = teamService.findById(id);
        return new ResponseEntity<>(teamDto, HttpStatus.OK);
    }
}
