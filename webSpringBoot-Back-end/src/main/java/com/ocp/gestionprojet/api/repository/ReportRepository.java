package com.ocp.gestionprojet.api.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.ReportEntity;

public interface ReportRepository  extends JpaRepository<ReportEntity, Integer>{

    List <ReportEntity> findBymemberId(Integer id);


    
}
