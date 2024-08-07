package com.ocp.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.EmployeEntity;

public interface EmployeRepository extends JpaRepository< EmployeEntity , Integer> {


     List <EmployeEntity> findByEquipeId(Integer eqpId);


     
}
