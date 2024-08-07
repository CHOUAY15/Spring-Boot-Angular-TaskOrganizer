package com.ocp.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.TacheEntity;

public interface TacheRepository extends JpaRepository<TacheEntity , Integer>{

    List <TacheEntity> findByEmployeId(Integer empId);

    List <TacheEntity> findByProjetId(Integer prjtId);

    
}
