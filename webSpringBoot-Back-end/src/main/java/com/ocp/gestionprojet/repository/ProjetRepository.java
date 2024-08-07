package com.ocp.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.ProjetEntity;

public interface ProjetRepository  extends JpaRepository <ProjetEntity ,Integer>{

    List <ProjetEntity> findByEquipeId(Integer eqpId);
    List<ProjetEntity> findByChefId(Integer chefId);
    
    
}
