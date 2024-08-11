package com.ocp.gestionprojet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.mapper.RepondreMapper;
import com.ocp.gestionprojet.model.dto.RepondreDto;
import com.ocp.gestionprojet.model.dto.RepondreRequestDto;
import com.ocp.gestionprojet.model.entity.ChefDequipeEntity;
import com.ocp.gestionprojet.model.entity.CommentaireEntity;
import com.ocp.gestionprojet.model.entity.RepondreEntity;
import com.ocp.gestionprojet.repository.ChefDequipeRepository;
import com.ocp.gestionprojet.repository.CommentaireRepository;
import com.ocp.gestionprojet.repository.RepondreRepository;
import com.ocp.gestionprojet.service.interfaces.RepondreService;

@Service

public class RepondreServiceImpl implements RepondreService {

    @Autowired
    private RepondreRepository repondreRepository;

    @Autowired
    private ChefDequipeRepository chefDequipeRepository;
    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private RepondreMapper repondreMapper;

    @Override
    @Transactional
    public RepondreDto addReponseToComment(RepondreRequestDto repondreRequestDto) throws EntityNotFoundException {
        ChefDequipeEntity chefDequipeEntity = chefDequipeRepository.findById(repondreRequestDto.getIdChef())
                .orElseThrow(() -> new EntityNotFoundException("chef not found"));

        CommentaireEntity commentaireEntity = commentaireRepository.findById(repondreRequestDto.getCommentaireId())
                .orElseThrow(() -> new EntityNotFoundException("comment not found"));

        RepondreEntity repondreEntity = new RepondreEntity();
        repondreEntity.setTexte(repondreRequestDto.getTexte());
        repondreEntity.setChef(chefDequipeEntity);
        repondreEntity.setCommentaire(commentaireEntity);
        RepondreEntity saveRepondreEntity = repondreRepository.save(repondreEntity);
        return repondreMapper.toDto(saveRepondreEntity);

    }

    @Override
    public void deleteReponsebyId(Integer id) {
        // TODO Auto-generated method stub
        repondreRepository.deleteById(id);
    }

    @Override
    @Transactional
    public RepondreDto updateReponse(RepondreRequestDto repondreRequestDto,Integer id) throws EntityNotFoundException {

        RepondreEntity repondreEntity = repondreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("reponse not found"));
        repondreEntity.setTexte(repondreRequestDto.getTexte());
        repondreEntity.setReactions(repondreRequestDto.getReactions());
        
        RepondreEntity saveReponse = repondreRepository.save(repondreEntity);

        return repondreMapper.toDto(saveReponse);
    }

}
