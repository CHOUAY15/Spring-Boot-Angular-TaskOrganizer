package com.ocp.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.RepondreEntity;

public interface RepondreRepository extends JpaRepository<RepondreEntity, Integer> {
    
}
