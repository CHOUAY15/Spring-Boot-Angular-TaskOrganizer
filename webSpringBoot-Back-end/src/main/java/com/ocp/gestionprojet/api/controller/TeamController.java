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
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamRequestDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;
import com.ocp.gestionprojet.api.service.interfaces.TeamService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    /**
     * Adds a new team to a department.
     *
     * @param teamRequestDto DTO containing the details of the team to be added.
     * @return ResponseEntity with the saved TeamResponseDto and HTTP status 201 Created.
     * @throws EntityNotFoundException if the department associated with the team is not found.
     */
    @PostMapping("")
    public ResponseEntity<TeamResponseDto> addTeamToDepartment(@Valid @RequestBody TeamRequestDto teamRequestDto)
            throws EntityNotFoundException {
        // Call the service method to add the team and return the result with HTTP 201 status
        TeamResponseDto savedTeamDto = teamService.addTeamToDepartment(teamRequestDto);
        return new ResponseEntity<>(savedTeamDto, HttpStatus.CREATED);
    }

    /**
     * Retrieves all teams.
     *
     * @return ResponseEntity with a list of all TeamResponseDto objects and HTTP status 200 OK.
     */
    @GetMapping("")
    public ResponseEntity<List<TeamResponseDto>> findAllTeams() {
        // Call the service method to fetch all teams and return the result with HTTP 200 status
        return new ResponseEntity<>(teamService.findAllTeams(), HttpStatus.OK);
    }

    /**
     * Retrieves teams managed by a specific manager.
     *
     * @param mgrId ID of the manager whose teams are to be retrieved.
     * @return ResponseEntity with a list of TeamResponseDto objects managed by the specified manager and HTTP status 200 OK.
     */
    @GetMapping("/mgrId/{mgrId}")
    public ResponseEntity<List<TeamResponseDto>> findTeamsByManager(@PathVariable("mgrId") Integer mgrId) {
        // Call the service method to fetch teams by manager ID and return the result with HTTP 200 status
        return new ResponseEntity<>(teamService.findTeamsByManager(mgrId), HttpStatus.OK);
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
        // Call the service method to update the team and return the result with HTTP 202 status
        TeamResponseDto updatedTeam = teamService.update(teamDto, id);
        return new ResponseEntity<>(updatedTeam, HttpStatus.ACCEPTED);
    }

    /**
     * Deletes a team by its ID.
     *
     * @param id ID of the team to be deleted.
     * @return ResponseEntity with HTTP status 204 No Content.
     */
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        // Call the service method to delete the team and return HTTP 204 status
        teamService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
