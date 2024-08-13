package com.ocp.gestionprojet.api.model.dto.taskDto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.shared.Priorite;
import com.ocp.gestionprojet.shared.StatutTache;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TaskResponseDto {

    private Integer id;
    private String title;
    private String description;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    private Integer dayNbrs;
    private StatutTache status;
    private Priorite priority;
    private MemberDto membre;

}
