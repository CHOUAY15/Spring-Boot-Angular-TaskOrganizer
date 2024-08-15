package com.ocp.gestionprojet.api.service.interfaces;

public interface StatisticsService {


    public long countTotalProjects();
    public long countTotalTeams();
    public long countTotalMembers();
    public long countTotalManagers();
    public double calculateProgressRatio();



    
}
