package com.ocp.gestionprojet.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.service.interfaces.StatisticsService;

@RestController
@RequestMapping("/api/stats")
public class StatisticsController {

    @Autowired

    private StatisticsService statisticsService;

    @GetMapping("/projects/count")
    public long getTotalProjects() {
        return statisticsService.countTotalProjects();
    }

    @GetMapping("/teams/count")
    public long getTotalTeams() {
        return statisticsService.countTotalTeams();
    }

    @GetMapping("/members/count")
    public long getTotalMembers() {
        return statisticsService.countTotalMembers();
    }

    @GetMapping("/managers/count")
    public long getTotalManagers() {
        return statisticsService.countTotalManagers();

    }

    @GetMapping("/projects/progress-ratio")
    public ResponseEntity<Map<String, Object>> getProjectProgressRatio() {
        double ratio = statisticsService.calculateProgressRatio();
        Map<String, Object> response = new HashMap<>();
        response.put("ratio", ratio);
        response.put("percentage", ratio * 100);
        return ResponseEntity.ok(response);
    }
}