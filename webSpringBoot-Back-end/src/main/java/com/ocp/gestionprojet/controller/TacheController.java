package com.ocp.gestionprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.TacheDto;
import com.ocp.gestionprojet.service.interfaces.TacheService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("taches")
@CrossOrigin(origins = "http://localhost:4200")

public class TacheController {

    @Autowired
    private TacheService tacheService;

    @GetMapping("")
    public ResponseEntity<List<TacheDto>> getAllTaches() {
        return new ResponseEntity<>(tacheService.findAll(), HttpStatus.OK);
    }

    // getOne
    @GetMapping("/id/{id}")
    public ResponseEntity<TacheDto> getTache(@PathVariable("id") Integer id) throws EntityNotFoundException {
        TacheDto tacheDto = tacheService.findById(id);
        return new ResponseEntity<>(tacheDto, HttpStatus.OK);
    }

    // Post
    @PostMapping("")
    public ResponseEntity<TacheDto> saveTache(@Valid @RequestBody TacheDto tacheDto) {
        TacheDto tachesavTacheDto = tacheService.save(tacheDto);
        return new ResponseEntity<>(tachesavTacheDto, HttpStatus.CREATED);

    }

    // update
    @PutMapping("")
    public ResponseEntity<TacheDto> updateTache(@Valid @RequestBody TacheDto tacheDto) throws EntityNotFoundException {
        TacheDto updatedTacheDto = tacheService.update(tacheDto);
        return new ResponseEntity<>(updatedTacheDto, HttpStatus.ACCEPTED);

    }

    // delete
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> deleteTache(@PathVariable("id") Integer id) {
        tacheService.delete(id);
        return ResponseEntity.noContent().build();

    }

    // add a tache to a projet
      // Post
      @PostMapping("/prjtId/{prjtId}")
      public ResponseEntity<TacheDto> addTacheToProjet(@Valid @RequestBody TacheDto tacheDto,@PathVariable ("prjtId") Integer prjtId) throws EntityNotFoundException{
          TacheDto tachesavTacheDto = tacheService.addTacheToProjet(tacheDto,prjtId);
          return new ResponseEntity<>(tachesavTacheDto, HttpStatus.CREATED);
  
      }


    //   find taches by employe
       // getOne
       @GetMapping("/empId/{empId}")
       public ResponseEntity<List<TacheDto>> getTacheByEmploye(@PathVariable("empId") Integer id) throws EntityNotFoundException {
        return new ResponseEntity<>(tacheService.findByEmploye(id), HttpStatus.OK);
       }


    //    find taches by projets
    @GetMapping("/prjtId/{prjtId}")
    public ResponseEntity<List<TacheDto>> getTachesByProjet(@PathVariable("prjtId") Integer prjtId) throws EntityNotFoundException {
     return new ResponseEntity<>(tacheService.findByProjets(prjtId), HttpStatus.OK);
    }

}
