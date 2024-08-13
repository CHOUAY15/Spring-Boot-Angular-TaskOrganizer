package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.PersonnelMapper;
import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.model.entity.MemberEntity;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;
import com.ocp.gestionprojet.api.repository.MemberRepository;
import com.ocp.gestionprojet.api.repository.TeamRepository;
import com.ocp.gestionprojet.api.service.interfaces.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PersonnelMapper personnelMapper;

    @Autowired
    private TeamRepository teamRepository;

    /**
     * Retrieves a member by its ID.
     *
     * @param id ID of the member to retrieve.
     * @return MemberDto containing member data.
     * @throws EntityNotFoundException if the member with the given ID is not found.
     */
    @Override
    @Transactional(readOnly = true)
    public MemberDto findById(Integer id) throws EntityNotFoundException {
        MemberEntity member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        return personnelMapper.toDto(member);
    }

    /**
     * Updates an existing member based on the provided MemberDto.
     *
     * @param memberDto DTO containing updated member data.
     * @return Updated MemberDto.
     * @throws EntityNotFoundException if the member with the given ID is not found.
     */
    @Override
    @Transactional
    public MemberDto update(MemberDto memberDto) throws EntityNotFoundException {
        MemberEntity member = memberRepository.findById(memberDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        // Update member properties from DTO
        updateMemberFromDto(member, memberDto);

        // Save the updated member entity
        MemberEntity updatedMember = memberRepository.save(member);
        return personnelMapper.toDto(updatedMember);
    }

    /**
     * Deletes a member by its ID.
     *
     * @param id ID of the member to delete.
     */
    @Override
    @Transactional
    public void delete(Integer id) {
        memberRepository.deleteById(id);
    }

    /**
     * Adds a new member to a team based on the provided MemberDto.
     *
     * @param memberDto DTO containing member data and team information.
     * @param user User entity associated with the member.
     * @return The newly created MemberEntity.
     * @throws EntityNotFoundException if the team with the given ID is not found.
     */
    @Override
    @Transactional
    public MemberEntity addMemberToTeam(MemberDto memberDto, UserEntity user) throws EntityNotFoundException {
        TeamEntity team = teamRepository.findById(memberDto.getTeam().getId())
                .orElseThrow(() -> new EntityNotFoundException("Team not found"));

        MemberEntity member = new MemberEntity();
        // Set member properties from DTO
        updateMemberFromDto(member, memberDto);
        member.setTeam(team);
        member.setUser(user);

        // Save the new member entity
        return memberRepository.save(member);
    }

    /**
     * Finds all members associated with a specific team.
     *
     * @param teamId ID of the team.
     * @return List of MemberDto for members associated with the team.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MemberDto> findByTeam(Integer teamId) {
        List<MemberEntity> members = memberRepository.findByTeamId(teamId);
        return members.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Finds all members associated with a specific manager.
     *
     * @param mgrId ID of the manager.
     * @return List of MemberDto for members managed by the manager.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MemberDto> findByManager(Integer mgrId) {
        List<MemberEntity> members = memberRepository.findByTeamManagerId(mgrId);
        return members.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Updates the properties of a MemberEntity based on the provided MemberDto.
     *
     * @param member MemberEntity to update.
     * @param dto DTO containing new member data.
     */
    private void updateMemberFromDto(MemberEntity member, MemberDto dto) {
        member.setName(dto.getName());
        member.setLastName(dto.getLastName());
        member.setCin(dto.getCin());
        member.setAge(dto.getAge());
        member.setTelephone(dto.getTelephone());
        member.setEmail(dto.getEmail());
        member.setAdresse(dto.getAdresse());
        member.setAvatar(dto.getAvatar());
        member.setGender(dto.getGender());
        member.setPosition(dto.getPosition());
    }
}
