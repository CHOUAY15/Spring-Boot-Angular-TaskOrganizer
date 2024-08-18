package com.ocp.gestionprojet.api.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.PersonnelMapper;
import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
import com.ocp.gestionprojet.api.model.entity.ManagerEntity;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;
import com.ocp.gestionprojet.api.model.entity.UserEntity;
import com.ocp.gestionprojet.api.repository.ManagerRepository;
import com.ocp.gestionprojet.api.repository.TeamRepository;
import com.ocp.gestionprojet.api.service.interfaces.ManagerService;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private PersonnelMapper personnelMapper;

    @Autowired
    private TeamRepository teamRepository;


    @Override
    @Transactional(readOnly = true)
    public ManagerDto findById(Integer id) throws EntityNotFoundException {
        ManagerEntity manager = managerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Manager not found"));
        return personnelMapper.toDto(manager);
    }

    @Override
    @Transactional
    public ManagerDto update(ManagerDto managerDto) throws EntityNotFoundException {
        ManagerEntity manager = managerRepository.findById(managerDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Manager not found"));

        // Update manager properties from DTO
        updateManagerFromDto(manager, managerDto);

        // Save the updated manager entity
        ManagerEntity updatedManager = managerRepository.save(manager);
        return personnelMapper.toDto(updatedManager);
    }

 
    @Override
    @Transactional
    public void delete(Integer id) {
        // Fetch all teams associated with the manager
        List<TeamEntity> teams = teamRepository.findByManagerId(id);
        
        // Set manager to null for all fetched teams
        for (TeamEntity  team : teams) {
            team.setManager(null);
        }
        
        // Save all updated teams
        teamRepository.saveAll(teams);
        
        // Delete the manager
        managerRepository.deleteById(id);
    }
    

 
    @Override
@Transactional
public ManagerEntity addManagersToTeams(ManagerDto managerDto, UserEntity user) throws EntityNotFoundException {
    List<Integer> teamIds = managerDto.getTeamsId();
    if (teamIds == null || teamIds.isEmpty()) {
        throw new IllegalArgumentException("Team IDs list cannot be null or empty");
    }

    ManagerEntity manager = new ManagerEntity();
    updateManagerFromDto(manager, managerDto);
    manager.setUser(user);

    Set<TeamEntity> teams = new HashSet<>();
    for (Integer teamId : teamIds) {
        TeamEntity teamEntity = teamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + teamId));
        teams.add(teamEntity);
        teamEntity.setManager(manager);
        teamRepository.save(teamEntity);
    }

   
    
    // Set the department based on the first team (assuming all teams are in the same department)
    if (!teams.isEmpty()) {
        manager.setSection(teams.iterator().next().getSection());
    }

    return managerRepository.save(manager);
}
  
    @Override
    @Transactional(readOnly = true)
    public List<ManagerDto> findAll() {
        List<ManagerEntity> managers = managerRepository.findAll();
        return managers.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }


    private void updateManagerFromDto(ManagerEntity manager, ManagerDto dto) {
        manager.setName(dto.getName());
        manager.setLastName(dto.getLastName());
        manager.setCin(dto.getCin());
        manager.setAge(dto.getAge());
        manager.setTelephone(dto.getTelephone());
        manager.setEmail(dto.getEmail());
        manager.setAdresse(dto.getAdresse());
        manager.setAvatar(dto.getAvatar());
        manager.setGender(dto.getGender());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ManagerDto> findBySection(Integer secId) {
        List<ManagerEntity> managers = managerRepository.findBySectionId(secId);
        return managers.stream()
                .map(personnelMapper::toDto)
                .collect(Collectors.toList());
    }

}
