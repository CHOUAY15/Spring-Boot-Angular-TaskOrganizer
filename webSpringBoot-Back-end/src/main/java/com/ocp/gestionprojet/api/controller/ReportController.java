package com.ocp.gestionprojet.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.reportDto.ReportDto;
import com.ocp.gestionprojet.api.service.interfaces.ReportService;

@RestController
@RequestMapping("api/reports")
public class ReportController {

        @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<ReportDto> addReport(@RequestBody ReportDto reportDto) throws EntityNotFoundException {
        ReportDto createdReport = reportService.addReport(reportDto);
        return ResponseEntity.ok(createdReport);
    }
     @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Integer id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }



    
}
