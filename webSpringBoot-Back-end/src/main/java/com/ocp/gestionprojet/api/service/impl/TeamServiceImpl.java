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
import com.ocp.gestionprojet.api.model.entity.DepartmentEntity;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;
import com.ocp.gestionprojet.api.repository.DepartmentRepository;
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
    private DepartmentRepository departmentRepository;
    @Autowired
    private ManagerRepository managerRepository;

    // add a team to departement
    @Override
    @Transactional
    public TeamResponseDto addTeamToDepartment(TeamRequestDto teamRequestDto) throws EntityNotFoundException {
        // Récupérer le département
        DepartmentEntity department = departmentRepository.findById(teamRequestDto.getDepartmentId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));

        // Récupérer le manager (s'il est spécifié)
        ManagerEntity manager = null;
        if (teamRequestDto.getManagerId() != null) {
            manager = managerRepository.findById(teamRequestDto.getManagerId())
                    .orElseThrow(() -> new EntityNotFoundException("Manager not found"));
        }

        // Créer et configurer la nouvelle équipe
        TeamEntity team = new TeamEntity();
        team.setName(teamRequestDto.getName());
        team.setDescription(teamRequestDto.getDescription());
        team.setDepartment(department);
        team.setManager(manager);

        // Sauvegarder l'équipe
        TeamEntity savedTeam = teamRepository.save(team);

        // Convertir et retourner la réponse
        return teamMapper.toDto(savedTeam);
    }

    @Override
    @Transactional
    public TeamResponseDto update(TeamRequestDto teamRequestDto, Integer id) throws EntityNotFoundException {
        TeamEntity team = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Team not found"));

        // Mettre à jour les champs modifiables
        team.setName(teamRequestDto.getName());
        team.setDescription(teamRequestDto.getDescription());

        // Mettre à jour le département si nécessaire
        if (teamRequestDto.getDepartmentId() != null) {
            DepartmentEntity department = departmentRepository.findById(teamRequestDto.getDepartmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Department not found"));
            team.setDepartment(department);
        }

        // Mettre à jour le manager si nécessaire
        if (teamRequestDto.getManagerId() != null) {
            ManagerEntity manager = managerRepository.findById(teamRequestDto.getManagerId())
                    .orElseThrow(() -> new EntityNotFoundException("Manager not found"));
            team.setManager(manager);
        }

        TeamEntity updatedTeam = teamRepository.save(team);
        return teamMapper.toDto(updatedTeam);
    }

    @Override
    public void delete(Integer id) {
        teamRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamResponseDto> findTeamsByManager(Integer mgrId) {
        List<TeamEntity> teams = teamRepository.findByManagerId(mgrId);
        return teams.stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamResponseDto> findAllTeams() {
        List<TeamEntity> teams = teamRepository.findAll();
        return teams.stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }

}
