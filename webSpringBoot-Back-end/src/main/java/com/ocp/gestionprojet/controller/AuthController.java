package com.ocp.gestionprojet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.exception.UserAlreadyExistsException;
import com.ocp.gestionprojet.model.dto.AuthResponseDto;
import com.ocp.gestionprojet.model.dto.LoginDto;
import com.ocp.gestionprojet.model.dto.RegisterAdminDto;
import com.ocp.gestionprojet.model.dto.RegisterChefDto;
import com.ocp.gestionprojet.model.dto.RegisterEmployeDto;

import com.ocp.gestionprojet.service.interfaces.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // register admin

    @PostMapping("register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterAdminDto registerDto) {
        try {
            userService.registerAdmin(registerDto);
            return ResponseEntity.ok("User registered successfully!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Username is taken!");
        }
    }

    // regiisetr chfff
    @PostMapping("register/chef/eqpId/{eqpId}")
    public ResponseEntity<String> registerChef(@RequestBody RegisterChefDto registerDto,
            @PathVariable("eqpId") Integer eqpId) {
        try {
            userService.registerChef(registerDto, eqpId);
            return ResponseEntity.ok("Chef registered successfully!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Username is taken!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // regiisetr emplouyee
    @PostMapping("register/employe/eqpId/{eqpId}")
    public ResponseEntity<String> registerEmploye(@RequestBody RegisterEmployeDto registerDto,
            @PathVariable("eqpId") Integer eqpId) {
        try {
            userService.registerEmploye(registerDto, eqpId);
            return ResponseEntity.ok("User registered successfully!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Username is taken!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    

    // login

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

}
