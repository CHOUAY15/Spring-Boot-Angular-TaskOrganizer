package com.ocp.gestionprojet.api.model.dto.deliverableDto;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class DeliverableDto {
    private Integer id;
    private String name;
    private String path;
 

}
