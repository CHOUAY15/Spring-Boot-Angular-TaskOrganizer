package com.ocp.gestionprojet.api.model.dto.teamDto;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TeamRequestDto {
    private String name;
    private String description;
    private Integer sectionId;
    private Integer managerId;

}
