package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.ProjectMapper;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectRequestDto;
import com.ocp.gestionprojet.api.model.dto.projectDto.ProjectResponseDto;
import com.ocp.gestionprojet.api.model.entity.DeliverableEntity;
import com.ocp.gestionprojet.api.model.entity.ProjectEntity;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;
import com.ocp.gestionprojet.api.repository.ProjectRepository;
import com.ocp.gestionprojet.api.repository.TeamRepository;
import com.ocp.gestionprojet.api.service.interfaces.ProjetService;

@Service
public class ProjectServiceImpl implements ProjetService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private TeamRepository teamRepository;

 
    @Override
    @Transactional
    public ProjectResponseDto update(ProjectRequestDto projectRequestDto, Integer id) throws EntityNotFoundException {
        // Fetch the existing project entity or throw an exception if not found
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        // Update project properties
        project.setName(projectRequestDto.getName());
        project.setEndDate(projectRequestDto.getEndDate());
        project.setDescription(projectRequestDto.getDescription());
        project.setProgressStatus(projectRequestDto.isProgressStatus());

        // Save the updated project entity
        ProjectEntity updatedProject = projectRepository.save(project);
        return projectMapper.toDto(updatedProject);
    }

  
    @Override
    @Transactional
    public void delete(Integer id) {
        projectRepository.deleteById(id);
    }

  
    @Override
    @Transactional
    public ProjectResponseDto addProjectToTeam(ProjectRequestDto projectDto) throws EntityNotFoundException {
        // Fetch the team entity or throw an exception if not found
        TeamEntity team = teamRepository.findById(projectDto.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException("Team not found"));

        // Create a new project entity
        ProjectEntity project = new ProjectEntity();
        project.setName(projectDto.getName());
        project.setEndDate(projectDto.getEndDate());
        project.setDescription(projectDto.getDescription());
        project.setProgressStatus(projectDto.isProgressStatus());
        project.setTeam(team);

        // Assign the team manager as the project manager
        project.setManager(team.getManager());

        // Map deliverables if provided
        if (projectDto.getDeliverables() != null) {
            List<DeliverableEntity> deliverableEntities = projectDto.getDeliverables().stream()
                    .map(deliverableDto -> {
                        DeliverableEntity deliverable = new DeliverableEntity();
                        deliverable.setName(deliverableDto.getName());
                        deliverable.setPath(deliverableDto.getPath());
                        deliverable.setProject(project);
                        return deliverable;
                    })
                    .collect(Collectors.toList());
            project.setDeliverables(deliverableEntities);
        }

        // Save the new project entity
        ProjectEntity savedProject = projectRepository.save(project);
        return projectMapper.toDto(savedProject);
    }

    
    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> findByTeam(Integer teamId) {
        List<ProjectEntity> projects = projectRepository.findByTeamId(teamId);
        return projects.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> findByManager(Integer mgrId) {
        List<ProjectEntity> projects = projectRepository.findByManagerId(mgrId);
        return projects.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }
}
