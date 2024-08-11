package com.ocp.gestionprojet.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.CommentaireDto;
import com.ocp.gestionprojet.model.dto.CommentaireRequestDto;

public interface CommentaireService {

    CommentaireDto addCommentaireToTache(CommentaireRequestDto commentaireRequestDto) throws EntityNotFoundException;

    CommentaireDto updateCommentaire(CommentaireRequestDto commentaireRequestDto,Integer id) throws EntityNotFoundException;

    List<CommentaireDto> getCommentaireByTache(Integer tacheId);

    void deleteCommentaire(Integer id);

}
