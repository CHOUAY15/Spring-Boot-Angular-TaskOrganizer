package com.ocp.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;

public interface ChefDequipeRepository extends JpaRepository<ChefDequipeEntity, Integer> {
    
}
