package com.ocp.gestionprojet.api.service.interfaces;

import org.springframework.security.core.Authentication;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.exception.UserAlreadyExistsException;
import com.ocp.gestionprojet.api.model.dto.authDto.AuthResponseDto;
import com.ocp.gestionprojet.api.model.dto.authDto.LoginDto;
import com.ocp.gestionprojet.api.model.dto.authDto.RegisterAdminDto;
import com.ocp.gestionprojet.api.model.dto.authDto.RegisterManagerDto;
import com.ocp.gestionprojet.api.model.dto.authDto.RegisterMemberDto;
import com.ocp.gestionprojet.api.model.dto.personDto.PersonDto;
import com.ocp.gestionprojet.api.model.entity.UserEntity;

public interface UserService {

    AuthResponseDto authenticateUser(LoginDto loginDto) ;

    Authentication authenticate(LoginDto loginDto);

    UserEntity getUserByEmail(String email);

    PersonDto getPersonDto(UserEntity user);

    AuthResponseDto buildAuthResponse(String token, UserEntity user, PersonDto personDto);

    void registerChef(RegisterManagerDto registerDto)
            throws UserAlreadyExistsException, EntityNotFoundException;

    UserEntity createUserEntityToChef(RegisterManagerDto registerDto,String password);

    void registerEmploye(RegisterMemberDto registerDto)
            throws UserAlreadyExistsException, EntityNotFoundException;

    UserEntity createUserEntityToEmploye(RegisterMemberDto registerDto);

    void registerAdmin(RegisterAdminDto registerDto) throws UserAlreadyExistsException;
    UserEntity createUserEntityToAdmin(RegisterAdminDto registerDto);
}
