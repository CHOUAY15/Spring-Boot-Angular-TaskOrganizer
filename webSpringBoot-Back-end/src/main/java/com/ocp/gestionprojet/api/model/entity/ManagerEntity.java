package com.ocp.gestionprojet.api.model.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "manager")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ManagerEntity extends Person {

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeamEntity> teams;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private DepartmentEntity department;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectEntity> projects;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResponseEntity> responses=new ArrayList<>() ;
   

}
