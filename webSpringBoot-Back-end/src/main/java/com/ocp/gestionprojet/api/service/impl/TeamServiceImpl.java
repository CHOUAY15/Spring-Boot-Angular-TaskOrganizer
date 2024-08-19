package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.TeamMapper;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamRequestDto;
import com.ocp.gestionprojet.api.model.dto.teamDto.TeamResponseDto;
import com.ocp.gestionprojet.api.model.entity.SectionEntity;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;
import com.ocp.gestionprojet.api.repository.SectionRepository;
import com.ocp.gestionprojet.api.repository.ManagerRepository;
import com.ocp.gestionprojet.api.repository.TeamRepository;
import com.ocp.gestionprojet.api.service.interfaces.TeamService;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamMapper teamMapper;
    
    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private SectionRepository sectionRepository;
    
    @Autowired
    private ManagerRepository managerRepository;

  
    @Override
    @Transactional
    public TeamResponseDto addTeamToSection(TeamRequestDto teamRequestDto) throws EntityNotFoundException {
        // Retrieve the section
        SectionEntity section = sectionRepository.findById(teamRequestDto.getSectionId())
                .orElseThrow(() -> new EntityNotFoundException("Section not found"));

        // Retrieve the manager if specified
        ManagerEntity manager = null;
        if (teamRequestDto.getManagerId() != null) {
            manager = managerRepository.findById(teamRequestDto.getManagerId())
                    .orElseThrow(() -> new EntityNotFoundException("Manager not found"));
        }

        // Create and configure the new team
        TeamEntity team = new TeamEntity();
        team.setName(teamRequestDto.getName());
        team.setDescription(teamRequestDto.getDescription());
        team.setSection(section);
        team.setManager(manager);

        // Save the team
        TeamEntity savedTeam = teamRepository.save(team);

        // Convert and return the response
        return teamMapper.toDto(savedTeam);
    }


    @Override
    @Transactional
    public TeamResponseDto update(TeamRequestDto teamRequestDto, Integer id) throws EntityNotFoundException {
        // Find the existing team by id, throw an exception if not found
        TeamEntity team = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Team not found"));
    
        // Update the mutable fields
        team.setName(teamRequestDto.getName());
        team.setDescription(teamRequestDto.getDescription());
    
        // Update the section if necessary
        if (teamRequestDto.getSectionId() != null) {
            SectionEntity section = sectionRepository.findById(teamRequestDto.getSectionId())
                    .orElseThrow(() -> new EntityNotFoundException("Section not found"));
            team.setSection(section);
        }
    
        // Update the manager if a managerId is provided
        if (teamRequestDto.getManagerId() != null) {
            ManagerEntity manager = managerRepository.findById(teamRequestDto.getManagerId())
                    .orElse(null); // Return null if the manager is not found
            team.setManager(manager);
        } else {
            team.setManager(null); // Explicitly set the manager to null if no managerId is provided
        }
    
        // Save the updated team and return the response DTO
        TeamEntity updatedTeam = teamRepository.save(team);
        return teamMapper.toDto(updatedTeam);
    }
    
 
    @Override
    public void delete(Integer id) {
        teamRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamResponseDto> findByManager(Integer mgrId) {
        List<TeamEntity> teams = teamRepository.findByManagerId(mgrId);
        return teams.stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    @Transactional(readOnly = true)
    public List<TeamResponseDto> findAll() {
        List<TeamEntity> teams = teamRepository.findAll();
        return teams.stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }

 
    @Override
    @Transactional(readOnly = true)
    public List<TeamResponseDto> findBySection(Integer deptId) {
        List<TeamEntity> teams = teamRepository.findBySectionId(deptId);
        return teams.stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public TeamResponseDto findById(Integer tmId) throws EntityNotFoundException {
        TeamEntity teamEntity=teamRepository.findById(tmId)
        .orElseThrow(() -> new EntityNotFoundException("Manager not found"));
        return teamMapper.toDto(teamEntity);

    
      
    }
}
