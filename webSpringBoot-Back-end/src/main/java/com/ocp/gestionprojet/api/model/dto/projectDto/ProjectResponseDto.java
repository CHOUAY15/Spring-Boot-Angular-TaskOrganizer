package com.ocp.gestionprojet.api.model.dto.projectDto;

import java.util.Date;
import java.util.List;

import com.ocp.gestionprojet.api.model.dto.deliverableDto.DeliverableDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ProjectResponseDto {
    private Integer id;
    private String name;
    private Date startDate;
    private Date endDate;
    private String description;
    private boolean progressStatus;
    private List<DeliverableDto> deliverables;
    private String teamName;

}
