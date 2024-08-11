package com.ocp.gestionprojet.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.EmployeDto;
import com.ocp.gestionprojet.service.interfaces.EmployeService;

// import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("api/employes")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    // getAll employees by equipe id
    @GetMapping("/eqpId/{eqpId}")
    public ResponseEntity<List<EmployeDto>> getAllEmployesByEquipeId(@PathVariable("eqpId") Integer eqpId) {
        return new ResponseEntity<>(employeService.findEmployeByEquipeId(eqpId), HttpStatus.OK);
    }

    // get All employe by chef id
    @GetMapping("/chefId/{chefId}")
    public ResponseEntity<List<EmployeDto>> getAllEMployesByChefId(@PathVariable("chefId") Integer chefId) {
        return new ResponseEntity<>(employeService.findByChef(chefId), HttpStatus.OK);
    }

    // getOne
    @GetMapping("/id/{id}")
    public ResponseEntity<EmployeDto> getEmploye(@PathVariable("id") Integer id) throws EntityNotFoundException {
        EmployeDto employeDto = employeService.findById(id);
        return new ResponseEntity<>(employeDto, HttpStatus.OK);
    }
    // Post

    // update
    // @PutMapping("")
    // public ResponseEntity<EmployeDto> updateEmploye(@Valid @RequestBody EmployeDto employeDto)
    //         throws EntityNotFoundException {
    //     EmployeDto updatedEmployeDto = employeService.update(employeDto);
    //     return new ResponseEntity<>(updatedEmployeDto, HttpStatus.ACCEPTED);

    // }

    // delete
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> deleteEmploye(@PathVariable("id") Integer id) {
        employeService.delete(id);
        return ResponseEntity.noContent().build();

    }

    // //add a employee in a equipe id
    // @PostMapping("/eqpId/{eqpId}")
    // public ResponseEntity<EmployeDto> addEmployeToEquipe(@Valid @RequestBody
    // EmployeDto employeDto, @PathVariable("eqpId") Integer eqpId) throws
    // EntityNotFoundException {
    // EmployeDto employeSavedDto =
    // employeService.addEmployeToEquipe(employeDto,eqpId);
    // return new ResponseEntity<>(employeSavedDto, HttpStatus.CREATED);

    // }

}
