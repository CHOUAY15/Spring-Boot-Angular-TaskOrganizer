package com.ocp.gestionprojet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ocp.gestionprojet.model.dto.PersonDto;
import com.ocp.gestionprojet.model.entity.AdminEntity;
import com.ocp.gestionprojet.model.entity.UserEntity;
import com.ocp.gestionprojet.repository.AdminRepository;
import com.ocp.gestionprojet.service.interfaces.AdminService;

@Service

public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public AdminEntity saveAdmin(PersonDto personDto,UserEntity user)  {
          AdminEntity adminEntity = new AdminEntity();
        adminEntity.setNom(personDto.getNom());
        adminEntity.setPrenom(personDto.getPrenom());
        adminEntity.setAge(personDto.getAge());
        adminEntity.setAdresse(personDto.getAdresse());
        adminEntity.setAvatar(personDto.getAvatar());
        adminEntity.setCin(personDto.getCin());
        adminEntity.setTelephone(personDto.getTelephone());
        adminEntity.setEmail(personDto.getEmail());
        adminEntity.setSexe(personDto.getSexe());
        adminEntity.setUser(user);
        AdminEntity savedAdminEntity = adminRepository.save(adminEntity);
        return savedAdminEntity;
    }

}
