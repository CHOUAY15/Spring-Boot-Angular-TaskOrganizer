package com.ocp.gestionprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.ProjetDto;
import com.ocp.gestionprojet.model.dto.ProjetRequestDto;
import com.ocp.gestionprojet.service.interfaces.ProjetService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/projets")

public class ProjetController {

    @Autowired
    private ProjetService projetService;

    // find projets by equipe id
    @GetMapping("/eqpId/{eqpId}")
    public ResponseEntity<List<ProjetDto>> getAllProjetByEquipe(@PathVariable("eqpId") Integer eqpId) {
        return new ResponseEntity<>(projetService.findByEquipe(eqpId), HttpStatus.OK);
    }

    // add a projet to equipe
    @PostMapping("/eqpId/{eqpId}")
    public ResponseEntity<ProjetDto> addProjetToEquipe(@Valid @RequestBody ProjetRequestDto projetDto,
            @PathVariable("eqpId") Integer eqpId) throws EntityNotFoundException {
        ProjetDto savedProjetDto = projetService.addProjetToEquipe(projetDto, eqpId);
        return new ResponseEntity<>(savedProjetDto, HttpStatus.CREATED);
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<ProjetDto> UpdateProjet(@PathVariable("id") Integer id,@Valid @RequestBody ProjetRequestDto projetDto)
            throws EntityNotFoundException {
        ProjetDto updatedProjetDto = projetService.update(projetDto,id);
        return new ResponseEntity<>(updatedProjetDto, HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteProjet(@PathVariable("id") Integer id) {
        projetService.delete(id);
        return ResponseEntity.noContent().build();

    }

    // find by chef Id
    @GetMapping("/chefId/{chefId}")
    public ResponseEntity<List<ProjetDto>> getAllByChef(@PathVariable("chefId") Integer chefId) {
        return new ResponseEntity<>(projetService.findByChef(chefId), HttpStatus.OK);
    }

    // mamhtajhmch db

    // @GetMapping("")
    // public ResponseEntity<List<ProjetDto>> getAllProjets() {
    // return new ResponseEntity<>(projetService.findAll(), HttpStatus.OK);
    // }

    // @GetMapping("/id/{id}")
    // public ResponseEntity<ProjetDto> getProjet(@PathVariable("id") Integer id)
    // throws EntityNotFoundException {
    // ProjetDto projetDto = projetService.findById(id);
    // return new ResponseEntity<>(projetDto, HttpStatus.OK);

    // }

    // @PostMapping("")
    // public ResponseEntity<ProjetDto> saveProjet(@Valid @RequestBody ProjetDto
    // projetDto) {
    // ProjetDto savedProjetDto = projetService.save(projetDto);
    // return new ResponseEntity<>(savedProjetDto, HttpStatus.CREATED);
    // }

}
