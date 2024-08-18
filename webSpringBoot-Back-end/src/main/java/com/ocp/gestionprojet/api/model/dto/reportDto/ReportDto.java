package com.ocp.gestionprojet.api.model.dto.reportDto;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ReportDto {

    private Integer id;
    private String name;
    private String path;
    private Date creationDate;
    private Integer membreId;
    private Integer projetId;
    
}
