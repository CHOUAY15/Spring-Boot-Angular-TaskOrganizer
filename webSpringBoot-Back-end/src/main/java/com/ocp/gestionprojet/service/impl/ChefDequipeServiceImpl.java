package com.ocp.gestionprojet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.ChefDequipeMapper;
import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
import com.ocp.gestionprojet.model.entity.DepartementEntity;
import com.ocp.gestionprojet.repository.ChefDequipeRepository;
import com.ocp.gestionprojet.repository.DepartementRepository;
import com.ocp.gestionprojet.service.interfaces.ChefDequipeService;

@Service
public class ChefDequipeServiceImpl implements ChefDequipeService {

    @Autowired
    private ChefDequipeRepository chefDequipeRepository;
    @Autowired
    private DepartementRepository departementRepository;

    @Autowired
    private ChefDequipeMapper chefDequipeMapper;

    @Override
    public ChefDequipeDto findById(Integer id) throws EntityNotFoundException {
        return null;

    }

    @Override
    public ChefDequipeDto update(ChefDequipeDto chefDequipeDto) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chefDequipeRepository.deleteById(id);
    }

    @Override
    public ChefDequipeDto save(ChefDequipeDto chefDequipeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public List<ChefDequipeDto> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    // add chef to department
    @Override
    public ChefDequipeDto addChefToDepartement(ChefDequipeDto chefDequipeDto, Integer deptId)
            throws EntityNotFoundException {
        DepartementEntity department = departementRepository.findById(deptId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id:"));
        ChefDequipeEntity chefEquipe = new ChefDequipeEntity();
        chefEquipe.setNom(chefDequipeDto.getNom());
        chefEquipe.setPrenom(chefDequipeDto.getPrenom());
        chefEquipe.setAge(chefDequipeDto.getAge());
        chefEquipe.setAdresse(chefDequipeDto.getAdresse());
        chefEquipe.setAvatar(chefDequipeDto.getAvatar());
        chefEquipe.setCin(chefDequipeDto.getCin());
        chefEquipe.setTelephone(chefDequipeDto.getTelephone());
        chefEquipe.setEmail(chefDequipeDto.getEmail());
        chefEquipe.setSexe(chefDequipeDto.getSexe());
        chefEquipe.setDepartement(department);


        ChefDequipeEntity savedChef = chefDequipeRepository.save(chefEquipe);
        return chefDequipeMapper.toDto(savedChef);
    }

}
