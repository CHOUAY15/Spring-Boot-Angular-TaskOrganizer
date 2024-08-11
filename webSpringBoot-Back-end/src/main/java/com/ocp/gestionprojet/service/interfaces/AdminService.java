package com.ocp.gestionprojet.service.interfaces;


import com.ocp.gestionprojet.model.dto.PersonDto;
import com.ocp.gestionprojet.model.entity.AdminEntity;
import com.ocp.gestionprojet.model.entity.UserEntity;

public interface AdminService {

        AdminEntity saveAdmin(PersonDto personDto,UserEntity user) ;

    
}
