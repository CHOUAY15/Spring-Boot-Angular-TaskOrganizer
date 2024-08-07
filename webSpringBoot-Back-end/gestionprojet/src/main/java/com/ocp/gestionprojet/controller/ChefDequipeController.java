package com.ocp.gestionprojet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.ChefDequipeDto;
import com.ocp.gestionprojet.service.interfaces.ChefDequipeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("chefs")
public class ChefDequipeController {

    @Autowired
    ChefDequipeService chefDequipeService;




    // add a chef equipe to a departement
    @PostMapping("/deptId/{deptId}")
    public ResponseEntity<ChefDequipeDto> addChefToDepartement(@Valid @RequestBody ChefDequipeDto chefDto,
            @PathVariable("deptId") Integer deptId) throws EntityNotFoundException {
        ChefDequipeDto savedChefDto = chefDequipeService.addChefToDepartement(chefDto, deptId);
        return new ResponseEntity<>(savedChefDto, HttpStatus.CREATED);

    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<?> deleteEmploye(@PathVariable("id") Integer id) {
        chefDequipeService.delete(id);
        return ResponseEntity.noContent().build();

    }

}
