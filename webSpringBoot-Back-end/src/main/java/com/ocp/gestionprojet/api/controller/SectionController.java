package com.ocp.gestionprojet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ocp.gestionprojet.api.model.dto.sectionDto.SectionDto;
import com.ocp.gestionprojet.api.service.interfaces.SectionService;

/**
 * SectionController is a REST controller that handles CRUD operations for
 * managing sections.
 * 
 * <p>
 * This controller exposes endpoints to create, retrieve, and delete sections.
 * It interacts with the SectionService to perform the required operations.
 * </p>
 * 
 * <p>
 * The base URL for all the endpoints in this controller is "/api/sections".
 * </p>
 */
@RestController
@RequestMapping("api/sections")
public class SectionController {

    @Autowired
    private SectionService sectionService;

    /**
     * Retrieves a list of all sections.
     * 
     * @return ResponseEntity containing a list of SectionDto objects and an HTTP
     *         status code 200 (OK).
     */
    @GetMapping("")
    public ResponseEntity<List<SectionDto>> findAll() {
        // Call the service method to retrieve all sections and return the result
        // with HTTP 200 status
        return new ResponseEntity<>(sectionService.findAll(), HttpStatus.OK);
    }

    /**
     * Creates a new section.
     * 
     * @param sectionDto DTO containing the details of the section to be created.
     * @return ResponseEntity containing the created SectionDto and an HTTP status
     *         code 201 (Created).
     */
    @PostMapping("")
    public ResponseEntity<SectionDto> save(@RequestBody SectionDto sectionDto) {
        // Call the service method to save the new section and return the result with
        // HTTP 201 status
        SectionDto savedSectionDto = sectionService.save(sectionDto);
        return new ResponseEntity<>(savedSectionDto, HttpStatus.CREATED);
    }

    /**
     * Deletes a section by its ID.
     * 
     * @param id The ID of the section to be deleted.
     * @return ResponseEntity with an HTTP status code 204 (No Content).
     */
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        // Call the service method to delete the section by ID
        sectionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
