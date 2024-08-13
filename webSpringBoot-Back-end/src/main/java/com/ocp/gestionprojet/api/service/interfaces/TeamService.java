package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamRequestDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;

public interface TeamService {

    // Update an existing team with the given ID using the provided data
    TeamResponseDto update(TeamRequestDto teamRequestDto, Integer id) throws EntityNotFoundException;

    // Delete a team by its ID
    void delete(Integer id);

    // Find and return a list of teams managed by a specific manager
    List<TeamResponseDto> findTeamsByManager(Integer mgrId);

    // Retrieve and return a list of all teams
    List<TeamResponseDto> findAllTeams();

    // Add a new team to a specified department
    TeamResponseDto addTeamToDepartment(TeamRequestDto teamRequestDto) throws EntityNotFoundException;
}
