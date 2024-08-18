package com.ocp.gestionprojet.api.service.interfaces;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.reportDto.ReportDto;

public interface ReportService {

      // Ajouter un rapport
    ReportDto addReport(ReportDto reportDto) throws EntityNotFoundException;

    // Supprimer un rapport par ID
    void deleteReport(Integer id);

    
}
