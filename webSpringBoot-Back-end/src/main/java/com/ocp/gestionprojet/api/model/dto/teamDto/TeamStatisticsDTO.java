package com.ocp.gestionprojet.api.model.dto.teamDto;


import lombok.Data;

@Data
public class TeamStatisticsDTO {
    private long totalTeams;
    private long teamsWithProjects;
    private long teamsWithoutProjects;
    private double averageTeamSize;
    private long totalProjects;
}