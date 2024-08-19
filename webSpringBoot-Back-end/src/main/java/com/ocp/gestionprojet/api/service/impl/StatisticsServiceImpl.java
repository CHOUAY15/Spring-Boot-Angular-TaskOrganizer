package com.ocp.gestionprojet.api.service.impl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.api.model.dto.teamDto.TeamStatisticsDTO;
import com.ocp.gestionprojet.api.model.entity.TeamEntity;
import com.ocp.gestionprojet.api.repository.ManagerRepository;
import com.ocp.gestionprojet.api.repository.MemberRepository;
import com.ocp.gestionprojet.api.repository.ProjectRepository;
import com.ocp.gestionprojet.api.repository.TaskRepository;
import com.ocp.gestionprojet.api.repository.TeamRepository;
import com.ocp.gestionprojet.api.service.interfaces.StatisticsService;
import com.ocp.gestionprojet.shared.StatutTache;

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
    @Autowired
    private TaskRepository taskRepository;

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

        public double getAverageMembersPerTeam() {
            long totalMembers = memberRepository.count();
            long totalTeams = teamRepository.count();
    
            if (totalTeams == 0) {
                return 0;
            }
    
            return (double) totalMembers / totalTeams;
        }
        public double getAverageManagersPerTeam() {
            long totalManagers = managerRepository.count();
            long totalTeams = teamRepository.count();
    
            if (totalTeams == 0) {
                return 0;
            }
    
            return (double) totalManagers / totalTeams;
        }

        @Override
        public long countByProgressStatusTrue() {
         
            return projectRepository.countByProgressStatusTrue();
        }

        @Override
        public long countByProgressStatusFalse() {

            return projectRepository.countByProgressStatusFalse();
        }

        @Override
        public TeamStatisticsDTO getTeamStatistics() {
        List<TeamEntity> allTeams = teamRepository.findAll();
        
        TeamStatisticsDTO statistics = new TeamStatisticsDTO();
        statistics.setTotalTeams(allTeams.size());
        
        long teamsWithProjects = allTeams.stream()
                .filter(team -> !team.getProjects().isEmpty())
                .count();
        statistics.setTeamsWithProjects(teamsWithProjects);
        statistics.setTeamsWithoutProjects(allTeams.size() - teamsWithProjects);
        
        double averageTeamSize = allTeams.stream()
                .mapToInt(TeamEntity::getTeamNbr)
                .average()
                .orElse(0);
        statistics.setAverageTeamSize(averageTeamSize);
        
        long totalProjects = allTeams.stream()
                .mapToLong(team -> team.getProjects().size())
                .sum();
        statistics.setTotalProjects(totalProjects);
        
        return statistics;
    }

      
}
