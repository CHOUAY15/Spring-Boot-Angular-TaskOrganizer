package com.ocp.gestionprojet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.ProjectEntity;

public interface ProjectRepository  extends JpaRepository <ProjectEntity ,Integer>{
    List<ProjectEntity> findByTeamId(Integer teamId);
    List<ProjectEntity> findByManagerId(Integer managerId);
    long countByProgressStatusTrue();
    
    
}
