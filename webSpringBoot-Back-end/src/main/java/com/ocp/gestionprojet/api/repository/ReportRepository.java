package com.ocp.gestionprojet.api.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.ReportEntity;

public interface ReportRepository  extends JpaRepository<ReportEntity, Integer>{


    
}
