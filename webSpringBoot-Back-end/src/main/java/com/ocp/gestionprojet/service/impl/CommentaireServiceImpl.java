package com.ocp.gestionprojet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.CommentaireMapper;
import com.ocp.gestionprojet.model.dto.CommentaireDto;
import com.ocp.gestionprojet.model.dto.CommentaireRequestDto;
import com.ocp.gestionprojet.model.entity.CommentaireEntity;
import com.ocp.gestionprojet.model.entity.EmployeEntity;
import com.ocp.gestionprojet.model.entity.TacheEntity;
import com.ocp.gestionprojet.repository.CommentaireRepository;
import com.ocp.gestionprojet.repository.EmployeRepository;
import com.ocp.gestionprojet.repository.TacheRepository;
import com.ocp.gestionprojet.service.interfaces.CommentaireService;

@Service

public class CommentaireServiceImpl implements CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private EmployeRepository employeRepository;
    @Autowired
    private TacheRepository tacheRepository;
    @Autowired
    private CommentaireMapper commentaireMapper;

    @Override
    @Transactional
    public CommentaireDto addCommentaireToTache(CommentaireRequestDto commentaireRequestDto)
            throws EntityNotFoundException {
        EmployeEntity employeEntity = employeRepository
                .findById(commentaireRequestDto.getIdEmploye())
                .orElseThrow(() -> new EntityNotFoundException("employe not found"));
        TacheEntity tacheEntity = tacheRepository.findById(commentaireRequestDto.getIdTache())
                .orElseThrow(() -> new EntityNotFoundException("tache not found"));
        CommentaireEntity commentaireEntity = new CommentaireEntity();
        commentaireEntity.setTexte(commentaireRequestDto.getTexte());
        commentaireEntity.setEstImportant(commentaireRequestDto.getEstImportant());
        commentaireEntity.setEmploye(employeEntity);
        commentaireEntity.setTache(tacheEntity);
        CommentaireEntity savedCommentaireEntity = commentaireRepository.save(commentaireEntity);
        return commentaireMapper.toDto(savedCommentaireEntity);
    }

    @Override
    @Transactional

    public CommentaireDto updateCommentaire(CommentaireRequestDto commentaireRequestDto, Integer id)
            throws EntityNotFoundException {
        // TODO Auto-generated method stub
        CommentaireEntity commentaireEntity = commentaireRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("commentaire not found"));
        commentaireEntity.setTexte(commentaireRequestDto.getTexte());
        commentaireEntity.setEstImportant(commentaireRequestDto.getEstImportant());
        CommentaireEntity savedCommentaire = commentaireRepository.save(commentaireEntity);

        return commentaireMapper.toDto(savedCommentaire);
    }

    @Override
    @Transactional

    public List<CommentaireDto> getCommentaireByTache(Integer tacheId) {
        return commentaireRepository.findByTacheId(tacheId).stream().map(entity -> commentaireMapper.toDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCommentaire(Integer id) {
        // TODO Auto-generated method stub
        commentaireRepository.deleteById(id);
    }

}
