package com.ocp.gestionprojet.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.DepartmentEntity;

public interface DepartmentRepository extends JpaRepository<DepartmentEntity , Integer> {
    
}
