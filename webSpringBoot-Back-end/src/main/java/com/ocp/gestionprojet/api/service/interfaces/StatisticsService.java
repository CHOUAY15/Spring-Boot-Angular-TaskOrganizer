package com.ocp.gestionprojet.api.service.interfaces;

/**
 * Interface defining the contract for retrieving and calculating various statistics
 * related to projects, teams, members, and managers within the system.
 */
public interface StatisticsService {

    /**
     * Counts the total number of projects in the system.
     *
     * @return The total number of projects.
     */
    long countTotalProjects();

    /**
     * Counts the total number of teams in the system.
     *
     * @return The total number of teams.
     */
    long countTotalTeams();

    /**
     * Counts the total number of members in the system.
     *
     * @return The total number of members.
     */
    long countTotalMembers();

    /**
     * Counts the total number of managers in the system.
     *
     * @return The total number of managers.
     */
    long countTotalManagers();

    /**
     * Calculates the progress ratio for all projects in the system.
     * The progress ratio represents the overall completion rate of projects.
     *
     * @return The calculated progress ratio as a double.
     */
    double calculateProgressRatio();
}
