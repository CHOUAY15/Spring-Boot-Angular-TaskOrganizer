package com.ocp.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.LivrableEntity;

public interface LivrableRepository extends JpaRepository<LivrableEntity, Integer> {
    
}
