package com.ocp.gestionprojet.api.model.dto.taskDto;

import com.ocp.gestionprojet.shared.Priorite;
import com.ocp.gestionprojet.shared.StatutTache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TaskRequestDto {

    private String title;
    private String description;
    private Integer dayNbrs;
    private Priorite priority;
    private Integer membreId;
    private Integer projectId;
    private StatutTache status;

}
