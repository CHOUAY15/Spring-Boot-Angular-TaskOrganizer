package com.ocp.gestionprojet.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.api.repository.ManagerRepository;
import com.ocp.gestionprojet.api.repository.MemberRepository;
import com.ocp.gestionprojet.api.repository.ProjectRepository;
import com.ocp.gestionprojet.api.repository.TeamRepository;
import com.ocp.gestionprojet.api.service.interfaces.StatisticsService;

@Service

public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired 
    private MemberRepository memberRepository;
    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public long countTotalProjects() {

        return projectRepository.count();
    }

    @Override
    public long countTotalTeams() {
        return teamRepository.count();
    }

    @Override
    public long countTotalMembers() {
        return memberRepository.count();
    }

    @Override
    public long countTotalManagers() {
        return managerRepository.count();
    }

    @Override
    public double calculateProgressRatio() {
        long totalProjects = countTotalProjects();
        if (totalProjects == 0) {
            return 0.0; // Évite la division par zéro
        }
        long projectsInProgress = projectRepository.countByProgressStatusTrue();
        return (double) projectsInProgress / totalProjects;    }

}
