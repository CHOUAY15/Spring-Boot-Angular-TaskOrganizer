package com.ocp.gestionprojet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.ManagerEntity;

public interface ManagerRepository extends JpaRepository<ManagerEntity, Integer> {
      List<ManagerEntity> findBySectionId(Integer secId);


    
}
