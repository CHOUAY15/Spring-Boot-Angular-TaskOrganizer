package com.ocp.gestionprojet.api.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "admin")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity

public class AdminEntity extends Person {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private UserEntity user;

}
