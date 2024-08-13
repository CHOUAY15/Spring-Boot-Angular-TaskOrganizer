package com.ocp.gestionprojet.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.DeliverableEntity;

public interface DeliverableRepository extends JpaRepository<DeliverableEntity, Integer> {
    
}
