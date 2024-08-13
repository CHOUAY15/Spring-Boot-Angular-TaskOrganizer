package com.ocp.gestionprojet.api.model.entity;

import com.ocp.gestionprojet.shared.SexePerson;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
@Data
@MappedSuperclass

public abstract class Person {
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "cin", unique = true, nullable = false)
    private String cin;

    @Column(name = "age")
    private Integer age;

    @Column(name = "telephone", unique = true, nullable = false)
    private String telephone;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "avatar")
    private String avatar;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private SexePerson gender;
    
    
    
}
