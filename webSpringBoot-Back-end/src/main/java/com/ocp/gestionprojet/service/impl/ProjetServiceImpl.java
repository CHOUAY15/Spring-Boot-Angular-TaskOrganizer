package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.LivrableMapper;
import com.ocp.gestionprojet.mapper.ProjetMapper;
import com.ocp.gestionprojet.model.dto.LivrableDto;
import com.ocp.gestionprojet.model.dto.ProjetDto;
import com.ocp.gestionprojet.model.dto.ProjetRequestDto;
import com.ocp.gestionprojet.model.entity.EquipeEntity;
import com.ocp.gestionprojet.model.entity.LivrableEntity;
import com.ocp.gestionprojet.model.entity.ProjetEntity;
import com.ocp.gestionprojet.repository.EquipeRepository;
import com.ocp.gestionprojet.repository.LivrableRepository;
import com.ocp.gestionprojet.repository.ProjetRepository;
import com.ocp.gestionprojet.service.interfaces.ProjetService;

@Service

public class ProjetServiceImpl implements ProjetService {
    @Autowired
    private ProjetRepository projetRepository;
    @Autowired
    private ProjetMapper projetMapper;

    @Autowired
    private EquipeRepository equipeRepository;
    @Autowired
    private LivrableMapper livrableMapper;
    @Autowired
    private LivrableRepository livrableRepository;

    @Override
    @Transactional
    public ProjetDto update(ProjetRequestDto projetDto, Integer id) throws EntityNotFoundException {

        ProjetEntity existingProjetEntity = projetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        projetMapper.updateProjetFromDto(projetDto, existingProjetEntity);

        ProjetEntity updatedProjetEntity = projetRepository.save(existingProjetEntity);

        return projetMapper.toDto(updatedProjetEntity);

    }

    @Override
    public void delete(Integer id) {
        projetRepository.deleteById(id);

    }

    // add prjet to equipe

    @Override
    @Transactional
    public ProjetDto addProjetToEquipe(ProjetRequestDto projetDto, Integer eqpId) throws EntityNotFoundException {
        EquipeEntity equipeEntity = equipeRepository.findById(eqpId)
                .orElseThrow(() -> new EntityNotFoundException("equipe not found with id"));
        ProjetEntity projetEntity = new ProjetEntity();
        projetEntity.setNom(projetDto.getNom());
        projetEntity.setDescription(projetDto.getDescription());
        projetEntity.setDateFin(projetDto.getDateFin());
        projetEntity.setEquipe(equipeEntity);
        projetEntity.setChef(equipeEntity.getChef());
        ProjetEntity savedProjetEntity = projetRepository.save(projetEntity);
        for (LivrableDto livrableDto : projetDto.getLivrables()) {
            LivrableEntity livrableEntity = livrableMapper.toEntity(livrableDto);
            livrableEntity.setProjet(projetEntity);
            livrableRepository.save(livrableEntity);
        }
        return projetMapper.toDto(savedProjetEntity);
    }

    // find projets par equipe

    @Override
    public List<ProjetDto> findByEquipe(Integer eqpId) {
        return projetRepository.findByEquipeId(eqpId)
                .stream()
                .map(entity -> projetMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    // find projet by chef
    @Override
    @Transactional
    public List<ProjetDto> findByChef(Integer chefId) {
        return projetRepository.findByChefId(chefId)
                .stream()
                .map(entity -> projetMapper.toDto(entity))
                .collect(Collectors.toList());

    }

    // @Override
    // public ProjetDto findById(Integer id) throws EntityNotFoundException {
    // return projetRepository.findById(id)
    // .map(entity -> projetMapper.toDto(entity))
    // .orElseThrow(() -> new EntityNotFoundException("projet n'est pas exist"));
    // }
    // @Override
    // public ProjetDto save(ProjetDto projetDto) {
    // ProjetEntity projetEntity = projetMapper.toEntity(projetDto);
    // ProjetEntity savedEntity = projetRepository.save(projetEntity);
    // return projetMapper.toDto(savedEntity);

    // }

    // @Override
    // public List<ProjetDto> findAll() {
    // return projetRepository.findAll()
    // .stream()
    // .map(entity -> projetMapper.toDto(entity))
    // .collect(Collectors.toList());

    // }

}
