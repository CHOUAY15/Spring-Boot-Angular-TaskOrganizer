package com.ocp.gestionprojet.api.service.interfaces;


import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;
import com.ocp.gestionprojet.api.model.entity.AdminEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;

public interface AdminService {

        AdminEntity save(PersonDto personDto,UserEntity user) ;

    
}
