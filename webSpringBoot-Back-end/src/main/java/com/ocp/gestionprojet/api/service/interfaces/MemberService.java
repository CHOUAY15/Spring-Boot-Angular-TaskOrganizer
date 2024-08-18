package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.model.entity.MemberEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;

/**
 * Interface defining the contract for managing members within the system.
 * Provides methods for creating, updating, deleting, and retrieving members.
 */
public interface MemberService {

    /**
     * Finds and returns a member by their ID.
     *
     * @param id The ID of the member to retrieve.
     * @return The {@link MemberDto} representing the member.
     * @throws EntityNotFoundException If the member with the specified ID is not found.
     */
    MemberDto findById(Integer id) throws EntityNotFoundException;

    /**
     * Updates an existing member with the provided data.
     *
     * @param memberDto The data transfer object containing the updated member details.
     * @return The updated {@link MemberDto}.
     * @throws EntityNotFoundException If the member to be updated is not found.
     */
    MemberDto update(MemberDto memberDto) throws EntityNotFoundException;

    /**
     * Deletes a member by their ID.
     *
     * @param id The ID of the member to delete.
     */
    void delete(Integer id);

    /**
     * Adds a new member to a specified team using the provided member data and user entity.
     *
     * @param memberDto The data transfer object containing the member's details.
     * @param user The {@link UserEntity} associated with the member.
     * @return The saved {@link MemberEntity}.
     * @throws EntityNotFoundException If the specified team is not found.
     */
    MemberEntity addMemberToTeam(MemberDto memberDto, UserEntity user) throws EntityNotFoundException;

    /**
     * Finds and returns a list of members associated with a specific team.
     *
     * @param teamId The ID of the team whose members are to be retrieved.
     * @return A list of {@link MemberDto} representing the members of the specified team.
     */
    List<MemberDto> findByTeam(Integer teamId);

    /**
     * Finds and returns a list of members managed by a specific manager.
     *
     * @param mgrId The ID of the manager whose members are to be retrieved.
     * @return A list of {@link MemberDto} representing the members managed by the specified manager.
     */
    List<MemberDto> findByManager(Integer mgrId);

    /**
     * Retrieves and returns a list of all members in the system.
     *
     * @return A list of {@link MemberDto} representing all members.
     */
    List<MemberDto> findAll();
}
