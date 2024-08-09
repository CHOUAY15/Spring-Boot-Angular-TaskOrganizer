package com.ocp.gestionprojet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.model.dto.AuthResponseDto;
import com.ocp.gestionprojet.model.dto.LoginDto;
import com.ocp.gestionprojet.model.dto.RegisterDto;
import com.ocp.gestionprojet.model.entity.UserEntity;
import com.ocp.gestionprojet.repository.UserRepository;
import com.ocp.gestionprojet.security.JWTGenerator;
import com.ocp.gestionprojet.shared.RolesUser;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTGenerator jwtGenerator;

    // regiisetr
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        user.setRole(RolesUser.USER);

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }
    // login

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);

        UserEntity user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        AuthResponseDto responseDto = new AuthResponseDto(
                token,
                user.getId(),
                user.getRole()
        );

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

}
