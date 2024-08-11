package com.ocp.gestionprojet.service.interfaces;

import org.springframework.security.core.Authentication;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.exception.UserAlreadyExistsException;
import com.ocp.gestionprojet.model.dto.AuthResponseDto;
import com.ocp.gestionprojet.model.dto.LoginDto;
import com.ocp.gestionprojet.model.dto.PersonDto;
import com.ocp.gestionprojet.model.dto.RegisterAdminDto;
import com.ocp.gestionprojet.model.dto.RegisterChefDto;
import com.ocp.gestionprojet.model.dto.RegisterEmployeDto;
import com.ocp.gestionprojet.model.entity.UserEntity;

public interface UserService {

    AuthResponseDto authenticateUser(LoginDto loginDto) ;

    Authentication authenticate(LoginDto loginDto);

    UserEntity getUserByEmail(String email);

    PersonDto getPersonDto(UserEntity user);

    AuthResponseDto buildAuthResponse(String token, UserEntity user, PersonDto personDto);

    void registerChef(RegisterChefDto registerDto, Integer deptId)
            throws UserAlreadyExistsException, EntityNotFoundException;

    UserEntity createUserEntityToChef(RegisterChefDto registerDto);

    void registerEmploye(RegisterEmployeDto registerDto, Integer eqpId)
            throws UserAlreadyExistsException, EntityNotFoundException;

    UserEntity createUserEntityToEmploye(RegisterEmployeDto registerDto);

    void registerAdmin(RegisterAdminDto registerDto) throws UserAlreadyExistsException;
    UserEntity createUserEntityToAdmin(RegisterAdminDto registerDto);
}
