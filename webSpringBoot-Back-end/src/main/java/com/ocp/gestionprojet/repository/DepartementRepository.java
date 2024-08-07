package com.ocp.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.DepartementEntity;

public interface DepartementRepository extends JpaRepository<DepartementEntity , Integer> {
    
}
