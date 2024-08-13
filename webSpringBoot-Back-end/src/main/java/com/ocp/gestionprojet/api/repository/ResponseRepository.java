package com.ocp.gestionprojet.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.ResponseEntity;

public interface ResponseRepository extends JpaRepository<ResponseEntity, Integer> {
    
}
