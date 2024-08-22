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

    @Override
    @Transactional(readOnly = true)
    public MemberDto findById(Integer id) throws EntityNotFoundException {
        MemberEntity member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        return personnelMapper.toDto(member);
    }

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

    @Override
    @Transactional
    public void delete(Integer id) throws EntityNotFoundException {
        MemberEntity member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        TeamEntity teamEntity = teamRepository.findById(member.getTeam().getId())
                .orElseThrow(() -> new EntityNotFoundException("Team not found"));
        teamEntity.setTeamNbr(teamEntity.getTeamNbr()-1);
        teamRepository.save(teamEntity);        
        memberRepository.deleteById(id);

    }

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
        team.setTeamNbr(team.getTeamNbr() + 1);
        teamRepository.save(team);

        // Save the new member entity
        return memberRepository.save(member);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MemberDto> findByTeam(Integer teamId) {
        List<MemberEntity> members = memberRepository.findByTeamId(teamId);
        return members.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MemberDto> findByManager(Integer mgrId) {
        List<MemberEntity> members = memberRepository.findByTeamManagerId(mgrId);
        return members.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }

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

    @Override
    @Transactional(readOnly = true)
    public List<MemberDto> findAll() {
        // TODO Auto-generated method stub
        List<MemberEntity> members = memberRepository.findAll();
        return members.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());

    }

    @Override
    public void deleteAll() {
        List<TeamEntity> teams=teamRepository.findAll();
        for (TeamEntity teamEntity : teams) {
            teamEntity.setTeamNbr(0);
            teamRepository.save(teamEntity);
        }
        memberRepository.deleteAll();

    }
}
