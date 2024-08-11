package com.ocp.gestionprojet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.exception.UserAlreadyExistsException;
import com.ocp.gestionprojet.mapper.PersonnelMapper;
import com.ocp.gestionprojet.model.dto.AuthResponseDto;
import com.ocp.gestionprojet.model.dto.LoginDto;
import com.ocp.gestionprojet.model.dto.PersonDto;
import com.ocp.gestionprojet.model.dto.RegisterAdminDto;
import com.ocp.gestionprojet.model.dto.RegisterChefDto;
import com.ocp.gestionprojet.model.dto.RegisterEmployeDto;
import com.ocp.gestionprojet.model.entity.AdminEntity;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
import com.ocp.gestionprojet.model.entity.EmployeEntity;
import com.ocp.gestionprojet.model.entity.UserEntity;
import com.ocp.gestionprojet.repository.UserRepository;
import com.ocp.gestionprojet.security.JWTGenerator;
import com.ocp.gestionprojet.service.interfaces.ChefDequipeService;
import com.ocp.gestionprojet.service.interfaces.EmployeService;
import com.ocp.gestionprojet.service.interfaces.AdminService;

import com.ocp.gestionprojet.service.interfaces.UserService;
import com.ocp.gestionprojet.shared.RolesUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTGenerator jwtGenerator;
    @Autowired
    private PersonnelMapper personnelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ChefDequipeService chefDequipeService;
    @Autowired
    private EmployeService employeService;
    @Autowired
    private AdminService adminService;

    // authentification

    @Override
    @Transactional
    public AuthResponseDto authenticateUser(LoginDto loginDto) {
        try {
            Authentication authentication = authenticate(loginDto);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserEntity user = getUserByEmail(authentication.getName());
            String token = jwtGenerator.generateToken(authentication);
            PersonDto personDto = getPersonDto(user);

            return buildAuthResponse(token, user, personDto);
        } catch (UsernameNotFoundException e) {
            throw new AuthenticationException("User not found") {
            };
        } catch (Exception e) {
            throw new AuthenticationException("Authentication failed") {
            };
        }
    }

    @Override
    public Authentication authenticate(LoginDto loginDto) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));
    }

    @Override
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public PersonDto getPersonDto(UserEntity user) {
        if (user.getEmploye() != null) {
            return personnelMapper.toDto(user.getEmploye());
        }
        if (user.getChef() != null) {
            return personnelMapper.toDto(user.getChef());
        }
        if (user.getAdmin() != null) {
            return personnelMapper.toDto(user.getAdmin());
        }
        throw new IllegalStateException("User has no associated role");
    }

    @Override
    public AuthResponseDto buildAuthResponse(String token, UserEntity user, PersonDto personDto) {
        return new AuthResponseDto(
                token,
                user.getId(),
                user.getRole(),
                personDto);
    }

    // register chef

    @Override
    @Transactional
    public void registerChef(RegisterChefDto registerDto, Integer eqpId)
            throws UserAlreadyExistsException, EntityNotFoundException {
        if (userRepository.existsByEmail(registerDto.getChefDequipe().getEmail())) {
            throw new UserAlreadyExistsException("Username is taken!");
        }

        UserEntity user = createUserEntityToChef(registerDto);
        userRepository.save(user);

        ChefDequipeEntity savedChefEntity = chefDequipeService.addChefToEquipe(
                registerDto.getChefDequipe(), eqpId,user);
        user.setChef(savedChefEntity);
        userRepository.save(user);
    }

    @Override
    public UserEntity createUserEntityToChef(RegisterChefDto registerDto) {
        UserEntity user = new UserEntity();
        user.setEmail(registerDto.getChefDequipe().getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(RolesUser.CHEF);
        return user;
    }

    // register emloyee

    @Override
    @Transactional
    public void registerEmploye(RegisterEmployeDto registerDto, Integer eqpId)
            throws UserAlreadyExistsException, EntityNotFoundException {
        if (userRepository.existsByEmail(registerDto.getEmployeDto().getEmail())) {
            throw new UserAlreadyExistsException("Username is taken!");
        }

        UserEntity user = createUserEntityToEmploye(registerDto);
        userRepository.save(user);
        EmployeEntity savedEmployeEntity = employeService.addEmployeToEquipe(registerDto.getEmployeDto(), eqpId,user);
        user.setEmploye(savedEmployeEntity);

        userRepository.save(user);
    }

    @Override
    public UserEntity createUserEntityToEmploye(RegisterEmployeDto registerDto) {
        UserEntity user = new UserEntity();
        user.setEmail(registerDto.getEmployeDto().getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(RolesUser.USER);
        return user;
    }

    // register admin
    @Override
    @Transactional
    public void registerAdmin(RegisterAdminDto registerDto) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(registerDto.getPerson().getEmail())) {
            throw new UserAlreadyExistsException("Username is taken!");
        }

        UserEntity user = createUserEntityToAdmin(registerDto);
        userRepository.save(user);
        AdminEntity savedAdmin = adminService.saveAdmin(registerDto.getPerson(), user);
        savedAdmin.setUser(user);

        user.setAdmin(savedAdmin);
        userRepository.save(user);

    }

    @Override
    public UserEntity createUserEntityToAdmin(RegisterAdminDto registerDto) {
        UserEntity user = new UserEntity();
        user.setEmail(registerDto.getPerson().getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(RolesUser.ADMIN);
        return user;
    }
}
