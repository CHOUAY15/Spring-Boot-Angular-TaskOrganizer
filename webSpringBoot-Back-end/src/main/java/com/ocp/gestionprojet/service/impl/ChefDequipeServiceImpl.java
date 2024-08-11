package com.ocp.gestionprojet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
// import com.ocp.gestionprojet.mapper.ChefDequipeMapper;
import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
// import com.ocp.gestionprojet.model.entity.DepartementEntity;
import com.ocp.gestionprojet.model.entity.EquipeEntity;
import com.ocp.gestionprojet.model.entity.UserEntity;
import com.ocp.gestionprojet.repository.ChefDequipeRepository;
// import com.ocp.gestionprojet.repository.DepartementRepository;
import com.ocp.gestionprojet.repository.EquipeRepository;
import com.ocp.gestionprojet.service.interfaces.ChefDequipeService;

@Service
public class ChefDequipeServiceImpl implements ChefDequipeService {

    @Autowired
    private ChefDequipeRepository chefDequipeRepository;
    // @Autowired
    // private DepartementRepository departementRepository;

    @Autowired
    EquipeRepository equipeRepository;

    // @Autowired
    // private ChefDequipeMapper chefDequipeMapper;

    // add chef to department

    // @Override
    // @Transactional
    // public ChefDequipeEntity addChefToDepartement(ChefDequipeDto chefDequipeDto, Integer deptId, UserEntity user)
    //         throws EntityNotFoundException {
    //     DepartementEntity department = departementRepository.findById(deptId)
    //             .orElseThrow(() -> new EntityNotFoundException("Department not found with id:"));
    //     ChefDequipeEntity chefEquipe = new ChefDequipeEntity();
    //     chefEquipe.setNom(chefDequipeDto.getNom());
    //     chefEquipe.setPrenom(chefDequipeDto.getPrenom());
    //     chefEquipe.setAge(chefDequipeDto.getAge());
    //     chefEquipe.setAdresse(chefDequipeDto.getAdresse());
    //     chefEquipe.setAvatar(chefDequipeDto.getAvatar());
    //     chefEquipe.setCin(chefDequipeDto.getCin());
    //     chefEquipe.setTelephone(chefDequipeDto.getTelephone());
    //     chefEquipe.setEmail(chefDequipeDto.getEmail());
    //     chefEquipe.setSexe(chefDequipeDto.getSexe());
    //     chefEquipe.setDepartement(department);
    //     chefEquipe.setUser(user);

    //     ChefDequipeEntity savedChef = chefDequipeRepository.save(chefEquipe);
    //     return savedChef;
    // }

    // add chef to equipe
    @Override
    @Transactional
    public ChefDequipeEntity addChefToEquipe(ChefDequipeDto chefDequipeDto, Integer eqpId, UserEntity user)
            throws EntityNotFoundException {

        EquipeEntity equipeEntity = equipeRepository.findById(eqpId)
                .orElseThrow(() -> new EntityNotFoundException("Equipe not found with id: " + eqpId));

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
        chefEquipe.setDepartement(equipeEntity.getDepartement());
        chefEquipe.setUser(user);
        chefEquipe = chefDequipeRepository.save(chefEquipe);
        equipeEntity.setChef(chefEquipe);
        equipeRepository.save(equipeEntity);
        return chefEquipe;
    }

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

}
