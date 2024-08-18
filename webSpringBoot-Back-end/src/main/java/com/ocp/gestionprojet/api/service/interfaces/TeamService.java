package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamRequestDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;

/**
 * Service interface for managing teams.
 * 
 * <p>
 * This interface defines the contract for operations related to teams, including
 * creating, updating, deleting, and retrieving team information.
 * </p>
 */
public interface TeamService {

    /**
     * Updates an existing team with the provided data.
     * 
     * @param teamRequestDto DTO containing the updated data for the team.
     * @param id The ID of the team to be updated.
     * @return TeamResponseDto containing the updated team information.
     * @throws EntityNotFoundException if the team with the specified ID does not exist.
     */
    TeamResponseDto update(TeamRequestDto teamRequestDto, Integer id) throws EntityNotFoundException;

    /**
     * Deletes a team by its ID.
     * 
     * @param id The ID of the team to be deleted.
     */
    void delete(Integer id);

    /**
     * Finds and returns a list of teams managed by a specific manager.
     * 
     * @param mgrId The ID of the manager.
     * @return List of TeamResponseDto objects representing the teams managed by the specified manager.
     */
    List<TeamResponseDto> findByManager(Integer mgrId);

    /**
     * Retrieves and returns a list of all teams.
     * 
     * @return List of TeamResponseDto objects representing all teams.
     */
    List<TeamResponseDto> findAll();

    /**
     * Adds a new team to a specified section.
     * 
     * @param teamRequestDto DTO containing the details of the new team to be added.
     * @return TeamResponseDto containing the information of the newly added team.
     * @throws EntityNotFoundException if the section to which the team is being added does not exist.
     */
    TeamResponseDto addTeamToSection(TeamRequestDto teamRequestDto) throws EntityNotFoundException;

    /**
     * Finds and returns a list of teams belonging to a specific section.
     * 
     * @param secId The ID of the section.
     * @return List of TeamResponseDto objects representing the teams in the specified section.
     */
    List<TeamResponseDto> findBySection(Integer secId);

    TeamResponseDto findById(Integer tmId) throws EntityNotFoundException;
}
