package com.ocp.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.model.entity.CommentaireEntity;

public interface CommentaireRepository extends JpaRepository<CommentaireEntity, Integer> {

    List<CommentaireEntity> findByTacheId(Integer tacheId);
}
