package com.ocp.gestionprojet.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;
import com.ocp.gestionprojet.api.model.entity.AdminEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;
import com.ocp.gestionprojet.api.repository.AdminRepository;
import com.ocp.gestionprojet.api.service.interfaces.AdminService;

@Service

public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public AdminEntity save(PersonDto personDto,UserEntity user)  {
          AdminEntity adminEntity = new AdminEntity();
        adminEntity.setName(personDto.getName());
        adminEntity.setLastName(personDto.getLastName());
        adminEntity.setAge(personDto.getAge());
        adminEntity.setAdresse(personDto.getAdresse());
        adminEntity.setAvatar(personDto.getAvatar());
        adminEntity.setCin(personDto.getCin());
        adminEntity.setTelephone(personDto.getTelephone());
        adminEntity.setEmail(personDto.getEmail());
        adminEntity.setGender(personDto.getGender());
        adminEntity.setUser(user);
        AdminEntity savedAdminEntity = adminRepository.save(adminEntity);
        return savedAdminEntity;
    }

}
