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

import java.util.List;
/**
 * Interface defining the contract for user-related operations, including
 * authentication, registration, and user management.
 */
public interface UserService {

    /**
     * Authenticates a user based on login credentials.
     *
     * @param loginDto The DTO containing the login credentials.
     * @return An AuthResponseDto containing the authentication token and user details.
     */
    AuthResponseDto authenticateUser(LoginDto loginDto);

    /**
     * Authenticates a user and returns the authentication object.
     *
     * @param loginDto The DTO containing the login credentials.
     * @return The Authentication object if authentication is successful.
     */
    Authentication authenticate(LoginDto loginDto);

    /**
     * Retrieves a user entity by their email.
     *
     * @param email The email address of the user.
     * @return The UserEntity corresponding to the given email.
     */
    UserEntity getUserByEmail(String email);

    /**
     * Converts a UserEntity to a PersonDto.
     *
     * @param user The UserEntity to be converted.
     * @return The corresponding PersonDto.
     */
    PersonDto getPersonDto(UserEntity user);

    /**
     * Builds an authentication response containing the token and user details.
     *
     * @param token The authentication token.
     * @param user The authenticated user.
     * @param personDto The corresponding person DTO.
     * @return An AuthResponseDto containing the token and user details.
     */
    AuthResponseDto buildAuthResponse(String token, UserEntity user, PersonDto personDto);

    /**
     * Registers a new manager and assigns them to a team.
     *
     * @param registerDto The DTO containing the registration details for the manager.
     * @throws UserAlreadyExistsException if the username is already taken.
     * @throws EntityNotFoundException if the team or other associated entity is not found.
     */
    void registerManager(RegisterManagerDto registerDto)
            throws UserAlreadyExistsException, EntityNotFoundException;

    /**
     * Creates a UserEntity for a new manager based on the registration DTO.
     *
     * @param registerDto The DTO containing the registration details.
     * @param password The password to set for the new manager.
     * @return The created UserEntity.
     */
    UserEntity createUserEntityToManager(RegisterManagerDto registerDto, String password);

    /**
     * Registers a new member and assigns them to a team.
     *
     * @param registerDto The DTO containing the registration details for the member.
     * @throws UserAlreadyExistsException if the username is already taken.
     * @throws EntityNotFoundException if the team or other associated entity is not found.
     */
    void registerMember(RegisterMemberDto registerDto)
            throws UserAlreadyExistsException, EntityNotFoundException;

    /**
     * Creates a UserEntity for a new member based on the registration DTO.
     *
     * @param registerDto The DTO containing the registration details.
     * @return The created UserEntity.
     */
    UserEntity createUserEntityToMember(RegisterMemberDto registerDto,String password);

    /**
     * Registers a new admin.
     *
     * @param registerDto The DTO containing the registration details for the admin.
     * @throws UserAlreadyExistsException if the username is already taken.
     */
    void registerAdmin(RegisterAdminDto registerDto) throws UserAlreadyExistsException;

    /**
     * Creates a UserEntity for a new admin based on the registration DTO.
     *
     * @param registerDto The DTO containing the registration details.
     * @return The created UserEntity.
     */
    UserEntity createUserEntityToAdmin(RegisterAdminDto registerDto);

    /**
     * Updates the password for a given user.
     *
     * @param username The username of the user.
     * @param newPassword The new password to be set.
     */
    public void updatePassword(String username, String newPassword);


    public int registerMembersFromCsv(List<RegisterMemberDto> members);
}
