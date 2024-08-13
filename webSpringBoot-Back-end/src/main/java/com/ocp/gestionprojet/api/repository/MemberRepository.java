package com.ocp.gestionprojet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.gestionprojet.api.model.entity.MemberEntity;

public interface MemberRepository extends JpaRepository< MemberEntity , Integer> {


     List<MemberEntity> findByTeamId(Integer teamId);
     List<MemberEntity> findByTeamManagerId(Integer managerId);


     
}
