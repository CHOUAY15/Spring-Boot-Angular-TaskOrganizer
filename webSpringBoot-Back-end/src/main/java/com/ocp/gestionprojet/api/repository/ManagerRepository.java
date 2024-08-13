package com.ocp.gestionprojet.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.ManagerEntity;

public interface ManagerRepository extends JpaRepository<ManagerEntity, Integer> {
    
}
