package com.ocp.gestionprojet.api.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.exception.UserAlreadyExistsException;
import com.ocp.gestionprojet.api.exception.handler.MessageResponse;
import com.ocp.gestionprojet.api.model.dto.authDto.AuthResponseDto;
import com.ocp.gestionprojet.api.model.dto.authDto.LoginDto;
import com.ocp.gestionprojet.api.model.dto.authDto.PasswordUpdateRequest;
import com.ocp.gestionprojet.api.model.dto.authDto.RegisterAdminDto;
import com.ocp.gestionprojet.api.model.dto.authDto.RegisterManagerDto;
import com.ocp.gestionprojet.api.model.dto.authDto.RegisterMemberDto;
import com.ocp.gestionprojet.api.model.entity.UserEntity;
import com.ocp.gestionprojet.api.service.interfaces.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * Registers a new admin user.
     *
     * @param registerDto DTO containing registration details for the admin.
     * @return ResponseEntity with a success message or error message based on the registration result.
     */
    @PostMapping("register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterAdminDto registerDto) {
        try {
            userService.registerAdmin(registerDto); 
            return ResponseEntity.ok("User registered successfully!"); 
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Username is taken!"); 
        }
    }

    /**
     * Registers a new manager and assigns them to a specific team.
     *
     * @param registerDto DTO containing registration details for the manager.
     * @param teamId ID of the team to which the manager will be assigned.
     * @return ResponseEntity with a success message or error message based on the registration result.
     */
    @PostMapping("register/manager")
    public ResponseEntity<String> registerManager(@RequestBody RegisterManagerDto registerDto) {
        try {
            userService.registerManager(registerDto); 
            return ResponseEntity.ok("Chef registered successfully!"); 
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Username is taken!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        }
    }

    /**
     * Registers a new member and assigns them to a specific team.
     *
     * @param registerDto DTO containing registration details for the member.
     * @param teamId ID of the team to which the member will be assigned.
     * @return ResponseEntity with a success message or error message based on the registration result.
     */
    @PostMapping("register/member")
    public ResponseEntity<String> registerMember(@RequestBody RegisterMemberDto registerDto) {
        try {
            userService.registerMember(registerDto); 
            return ResponseEntity.ok("User registered successfully!"); 
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Username is taken!"); 
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        }
    }

    /**
     * Authenticates a user and provides an authentication token if successful.
     *
     * @param loginDto DTO containing login credentials.
     * @return ResponseEntity with an authentication token or an error message based on the authentication result.
     */
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            AuthResponseDto responseDto = userService.authenticateUser(loginDto); 
            return ResponseEntity.ok(responseDto); 
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred"); 
        }
    }

     @GetMapping("/password-status")
    public ResponseEntity<Boolean> checkPasswordStatus(Principal principal) {
        UserEntity user = userService.getUserByEmail(principal.getName());
        return ResponseEntity.ok(user.isPasswordUpdated());
    }

   @PostMapping("/update-password")
public ResponseEntity<?> updatePassword(@RequestBody PasswordUpdateRequest request, Principal principal) {
    try {
        userService.updatePassword(principal.getName(), request.getNewPassword());
        return ResponseEntity.ok().body(new MessageResponse("Password updated successfully"));
    } catch (UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("An error occurred while updating the password"));
    }
}



}
