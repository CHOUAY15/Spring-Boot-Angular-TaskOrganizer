package com.ocp.gestionprojet.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.service.interfaces.StatisticsService;

/**
 * StatisticsController is a REST controller that provides endpoints for retrieving various
 * statistics related to projects, teams, members, and managers.
 * 
 * <p>
 * The base URL for all the endpoints in this controller is "/api/stats".
 * </p>
 */
@RestController
@RequestMapping("/api/stats")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    /**
     * Retrieves the total number of projects.
     * 
     * @return long representing the total number of projects.
     */
    @GetMapping("/projects/count")
    public long getTotalProjects() {
        return statisticsService.countTotalProjects();
    }

    /**
     * Retrieves the total number of teams.
     * 
     * @return long representing the total number of teams.
     */
    @GetMapping("/teams/count")
    public long getTotalTeams() {
        return statisticsService.countTotalTeams();
    }

    /**
     * Retrieves the total number of members.
     * 
     * @return long representing the total number of members.
     */
    @GetMapping("/members/count")
    public long getTotalMembers() {
        return statisticsService.countTotalMembers();
    }

    /**
     * Retrieves the total number of managers.
     * 
     * @return long representing the total number of managers.
     */
    @GetMapping("/managers/count")
    public long getTotalManagers() {
        return statisticsService.countTotalManagers();
    }

    /**
     * Retrieves the project progress ratio.
     * 
     * <p>
     * This endpoint calculates the ratio of completed projects to total projects and returns
     * it as a percentage.
     * </p>
     * 
     * @return ResponseEntity containing a map with the following keys:
     *         <ul>
     *         <li>"ratio": The ratio of completed projects to total projects (a double).</li>
     *         <li>"percentage": The ratio converted to a percentage (a double).</li>
     *         </ul>
     */
    @GetMapping("/projects/progress-ratio")
    public ResponseEntity<Map<String, Object>> getProjectProgressRatio() {
        double ratio = statisticsService.calculateProgressRatio();
        Map<String, Object> response = new HashMap<>();
        response.put("ratio", ratio);
        response.put("percentage", ratio * 100);
        return ResponseEntity.ok(response);
    }
}
