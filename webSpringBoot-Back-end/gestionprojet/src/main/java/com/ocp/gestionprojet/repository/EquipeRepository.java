package com.ocp.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.EquipeEntity;

public interface EquipeRepository extends JpaRepository<EquipeEntity, Integer> {

    List<EquipeEntity> findByDepartementId(Integer id);
    List<EquipeEntity> findByChefId(Integer idChef);



}
