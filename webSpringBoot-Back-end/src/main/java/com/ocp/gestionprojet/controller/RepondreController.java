package com.ocp.gestionprojet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.RepondreDto;
import com.ocp.gestionprojet.model.dto.RepondreRequestDto;
import com.ocp.gestionprojet.service.interfaces.RepondreService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/reponses")

public class RepondreController {

    @Autowired
    private RepondreService repondreService;

    // add reponse to commentaire
    @PostMapping("")
    public ResponseEntity<RepondreDto> addReponse(@RequestBody RepondreRequestDto repondreRequestDto)
            throws EntityNotFoundException {

        return new ResponseEntity<>(repondreService.addReponseToComment(repondreRequestDto), HttpStatus.CREATED);

    }

    // delete reponse

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteRepondre(@PathVariable("id") Integer id) {
        repondreService.deleteReponsebyId(id);
        return ResponseEntity.noContent().build();

    }

    // update reponse
    @PutMapping("/id/{id}")
    public ResponseEntity<RepondreDto> updateRepondre(@PathVariable("id") Integer id,
            @Valid @RequestBody RepondreRequestDto repondreRequestDto)
            throws EntityNotFoundException {
        RepondreDto updateReponseDto = repondreService.updateReponse(repondreRequestDto, id);
        return new ResponseEntity<>(updateReponseDto, HttpStatus.ACCEPTED);

    }

}
