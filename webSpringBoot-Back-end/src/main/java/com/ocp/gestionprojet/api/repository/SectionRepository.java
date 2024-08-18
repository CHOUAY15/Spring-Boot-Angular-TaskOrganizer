package com.ocp.gestionprojet.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.SectionEntity;

public interface SectionRepository extends JpaRepository<SectionEntity , Integer> {
    
}
