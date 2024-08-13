package com.ocp.gestionprojet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.managerDto.ManagerDto;
import com.ocp.gestionprojet.api.service.interfaces.ManagerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/managers")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    /**
     * Retrieves a manager by their ID.
     *
     * @param id The ID of the manager to retrieve.
     * @return ResponseEntity with the manager details or an error message if not found.
     * @throws EntityNotFoundException if no manager with the given ID exists.
     */
    @GetMapping("/id/{id}")
    public ResponseEntity<ManagerDto> findById(@PathVariable("id") Integer id) throws EntityNotFoundException {
        ManagerDto managerDto = managerService.findById(id);
        return new ResponseEntity<>(managerDto, HttpStatus.OK);
    }

    /**
     * Deletes a manager by their ID.
     *
     * @param id The ID of the manager to delete.
     * @return ResponseEntity with no content to indicate successful deletion.
     */
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        managerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Updates a manager's details.
     *
     * @param managerDto DTO containing the updated manager details.
     * @return ResponseEntity with the updated manager details or an error message if not found.
     * @throws EntityNotFoundException if no manager with the given ID exists.
     */
    @PutMapping("")
    public ResponseEntity<ManagerDto> update(@Valid @RequestBody ManagerDto managerDto) throws EntityNotFoundException {
        ManagerDto updatedManagerDto = managerService.update(managerDto);
        return new ResponseEntity<>(updatedManagerDto, HttpStatus.ACCEPTED);
    }

    /**
     * Retrieves a list of all managers.
     *
     * @return ResponseEntity with a list of all managers.
     */
    @GetMapping("")
    public ResponseEntity<List<ManagerDto>> findAll() {
        return new ResponseEntity<>(managerService.findAll(), HttpStatus.OK);
    }
}
