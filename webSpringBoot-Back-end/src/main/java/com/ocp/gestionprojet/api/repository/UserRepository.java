package com.ocp.gestionprojet.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {

   Optional<UserEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
    
}
