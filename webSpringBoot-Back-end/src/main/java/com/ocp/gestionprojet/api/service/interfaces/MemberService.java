package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.model.entity.MemberEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;

public interface MemberService {

    // Find and return a member by their ID
    MemberDto findById(Integer id) throws EntityNotFoundException;

    // Update an existing member with the provided data
    MemberDto update(MemberDto memberDto) throws EntityNotFoundException;

    // Delete a member by their ID
    void delete(Integer id);

    // Add a new member to a specified team using the provided member data and user entity
    MemberEntity addMemberToTeam(MemberDto memberDto, UserEntity user) throws EntityNotFoundException;

    // Find and return a list of members associated with a specific team
    List<MemberDto> findByTeam(Integer teamId);

    // Find and return a list of members managed by a specific manager
    List<MemberDto> findByManager(Integer mgrId);
}
