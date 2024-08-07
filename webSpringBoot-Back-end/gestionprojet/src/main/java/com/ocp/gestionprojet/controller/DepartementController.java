package com.ocp.gestionprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.model.dto.DepartementDto;
import com.ocp.gestionprojet.service.interfaces.DepartementService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("departements")

public class DepartementController {

    @Autowired
    private DepartementService departementService;

    @GetMapping("")
    public ResponseEntity<List<DepartementDto>> getAllDepartements() {
        return new ResponseEntity<>(departementService.findAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity <DepartementDto> saveDepartement(@RequestBody DepartementDto departementDto) {
        DepartementDto savedDepartementDto=departementService.Save(departementDto);
        return new ResponseEntity<>(savedDepartementDto, HttpStatus.CREATED);
    }
    

}
