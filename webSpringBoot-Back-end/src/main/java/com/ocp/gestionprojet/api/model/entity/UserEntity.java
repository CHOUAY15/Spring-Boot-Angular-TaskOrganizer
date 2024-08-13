package com.ocp.gestionprojet.api.model.entity;

import com.ocp.gestionprojet.shared.RolesUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email",nullable = false)
    private String email;


    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role",nullable = false)
    private RolesUser role;

    @OneToOne(mappedBy = "user")
    private MemberEntity member;

    @OneToOne (mappedBy = "user")
    private ManagerEntity manager;

    @OneToOne(mappedBy = "user")
    private AdminEntity admin;


}
