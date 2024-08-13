package com.ocp.gestionprojet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.TeamEntity;

public interface TeamRepository extends JpaRepository<TeamEntity, Integer> {

    List<TeamEntity> findByManagerId(Integer mgrId);



}
