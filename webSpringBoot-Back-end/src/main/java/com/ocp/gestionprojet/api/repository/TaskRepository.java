package com.ocp.gestionprojet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ocp.gestionprojet.api.model.entity.TaskEntity;

public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {

    List<TaskEntity> findByMemberId(Integer mbrId);

    List<TaskEntity> findByProjectId(Integer prjtId);

    @Query("SELECT t FROM TaskEntity t WHERE t.member.id = :memberId AND t.project.id = :projectId")
    List<TaskEntity> findTasksByMemberAndProject(@Param("memberId") Integer memberId,
            @Param("projectId") Integer projectId);

}
