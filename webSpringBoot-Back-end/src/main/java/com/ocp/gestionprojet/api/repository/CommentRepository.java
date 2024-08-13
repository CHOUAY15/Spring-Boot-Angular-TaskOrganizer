package com.ocp.gestionprojet.api.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

}
