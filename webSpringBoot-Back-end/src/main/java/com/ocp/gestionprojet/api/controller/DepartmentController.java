package com.ocp.gestionprojet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.model.dto.departmentDto.DepartmentDto;
import com.ocp.gestionprojet.api.service.interfaces.DepartmentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    /**
     * Retrieves a list of all departments.
     *
     * @return ResponseEntity with a list of DepartmentDto objects and HTTP status 200 OK.
     */
    @GetMapping("")
    public ResponseEntity<List<DepartmentDto>> findAll() {
        // Call the service method to retrieve all departments and return the result with HTTP 200 status
        return new ResponseEntity<>(departmentService.findAll(), HttpStatus.OK);
    }

    /**
     * Creates a new department.
     *
     * @param departmentDto DTO containing the details of the department to be created.
     * @return ResponseEntity with the created DepartmentDto and HTTP status 201 Created.
     */
    @PostMapping("")
    public ResponseEntity<DepartmentDto> saveDepartement(@RequestBody DepartmentDto departmentDto) {
        // Call the service method to save the new department and return the result with HTTP 201 status
        DepartmentDto savedDepartmentDto = departmentService.save(departmentDto);
        return new ResponseEntity<>(savedDepartmentDto, HttpStatus.CREATED);
    }
}
