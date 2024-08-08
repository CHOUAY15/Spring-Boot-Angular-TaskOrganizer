package com.ocp.gestionprojet.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.RapportEntity;

public interface RapportRepository  extends JpaRepository<RapportEntity, Integer>{


    
}
