package com.ocp.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    
}
