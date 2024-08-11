package com.ocp.gestionprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.CommentaireDto;
import com.ocp.gestionprojet.model.dto.CommentaireRequestDto;
import com.ocp.gestionprojet.service.interfaces.CommentaireService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/commentaires")

public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // add commentaire to une tache

    @PostMapping("")
    public ResponseEntity<CommentaireDto> addCommentaireToTache(
            @Valid @RequestBody CommentaireRequestDto commentaireRequestDto) throws EntityNotFoundException {
        CommentaireDto savedCommentaire = commentaireService.addCommentaireToTache(commentaireRequestDto);
        return new ResponseEntity<>(savedCommentaire, HttpStatus.CREATED);
    }

    // update commentaire
    @PutMapping("id/{id}")
    public ResponseEntity<CommentaireDto> updateCommentaire(@PathVariable("id") Integer id,
            @RequestBody CommentaireRequestDto commentaireRequestDto) throws EntityNotFoundException {
        CommentaireDto updated = commentaireService.updateCommentaire(commentaireRequestDto, id);
        return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);

    }

    // get commentaires by tache
    @GetMapping("/tacheId/{id}")
    public ResponseEntity<List<CommentaireDto>> getAllCommentsByTache(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(commentaireService.getCommentaireByTache(id), HttpStatus.OK);
    }

    // delete commentaire

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteProjet(@PathVariable("id") Integer id) {
        commentaireService.deleteCommentaire(id);
        return ResponseEntity.noContent().build();

    }
}
