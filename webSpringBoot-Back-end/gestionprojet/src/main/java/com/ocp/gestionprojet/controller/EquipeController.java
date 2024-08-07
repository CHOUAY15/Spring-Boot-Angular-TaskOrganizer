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
import com.ocp.gestionprojet.model.dto.EquipeDto;
import com.ocp.gestionprojet.service.interfaces.EquipeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("equipes")
@CrossOrigin(origins = "http://localhost:4200")

public class EquipeController {
    @Autowired
    private EquipeService equipeService;

    @GetMapping("/deptId/{deptId}")
    public ResponseEntity<List<EquipeDto>> getEquipesByDepartmentId(@PathVariable("deptId") Integer deptId) {
        return new ResponseEntity<>(equipeService.findEquipesByDepartmentId(deptId), HttpStatus.OK);
    }

    // getOne
    @GetMapping("/id/{id}")
    public ResponseEntity<EquipeDto> getEmploye(@PathVariable("id") Integer id) throws EntityNotFoundException {
        EquipeDto equipeDto = equipeService.findById(id);
        return new ResponseEntity<>(equipeDto, HttpStatus.OK);
    }

    // Post
    @PostMapping("/deptID/{deptID}")
    public ResponseEntity<EquipeDto> addEquipeToDeparatement(@Valid @RequestBody EquipeDto equipeDto,
            @PathVariable("deptID") Integer deptID) throws EntityNotFoundException {
        EquipeDto savEquipeDto = equipeService.addEquipeToDepartment(equipeDto, deptID);
        return new ResponseEntity<>(savEquipeDto, HttpStatus.CREATED);

    }

    // update
    @PutMapping("")
    public ResponseEntity<EquipeDto> updateEmploye(@Valid @RequestBody EquipeDto equipeDto)
            throws EntityNotFoundException {
        EquipeDto updatedEquipeDto = equipeService.update(equipeDto);
        return new ResponseEntity<>(updatedEquipeDto, HttpStatus.ACCEPTED);

    }

    // delete
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> deleteEmploye(@PathVariable("id") Integer id) {
        equipeService.delete(id);
        return ResponseEntity.noContent().build();

    }

    // find equipe par chef
    @GetMapping("/chefId/{chefID}")
    public ResponseEntity<List<EquipeDto>> getEquipeByChef(@PathVariable("chefID") Integer chefID) {
        return new ResponseEntity<>(equipeService.findEquipesByChefId(chefID), HttpStatus.OK);
    }

    // add equipe a un chef
    @PostMapping("/chefId/{chefId}")
    public ResponseEntity<EquipeDto> addEquipeToChef(@Valid @RequestBody EquipeDto equipeDto,
            @PathVariable("chefId") Integer ChefId) throws EntityNotFoundException {
        EquipeDto savEquipeDto = equipeService.addEquipeToChef(equipeDto, ChefId);
        return new ResponseEntity<>(savEquipeDto, HttpStatus.CREATED);

    }

}
