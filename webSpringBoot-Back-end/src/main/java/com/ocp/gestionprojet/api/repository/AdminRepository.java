package com.ocp.gestionprojet.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    
}
