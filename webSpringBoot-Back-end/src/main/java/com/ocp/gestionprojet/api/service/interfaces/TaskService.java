package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskRequestDto;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskResponseDto;

/**
 * Interface defining the contract for task-related operations, including task management
 * and retrieval of tasks associated with projects and members.
 */
public interface TaskService {

    /**
     * Updates an existing task with the given ID using the provided data.
     *
     * @param taskRequestDto The DTO containing the updated task data.
     * @param id The ID of the task to be updated.
     * @return A TaskResponseDto containing the details of the updated task.
     * @throws EntityNotFoundException If the task with the given ID is not found.
     */
    TaskResponseDto update(TaskRequestDto taskRequestDto, Integer id) throws EntityNotFoundException;

    /**
     * Deletes a task by its ID.
     *
     * @param id The ID of the task to be deleted.
     */
    void delete(Integer id);

    /**
     * Adds a new task to a specified project.
     *
     * @param taskRequestDto The DTO containing the task details to be added.
     * @return A TaskResponseDto containing the details of the added task.
     * @throws EntityNotFoundException If the specified project is not found.
     */
    TaskResponseDto addTaskToProject(TaskRequestDto taskRequestDto) throws EntityNotFoundException;

    /**
     * Finds and returns a list of tasks assigned to a specific member within a project.
     *
     * @param mbrId The ID of the member.
     * @param prjtId The ID of the project.
     * @return A list of TaskResponseDto objects representing the tasks assigned to the member.
     */
    List<TaskResponseDto> findTaskByMemberInProject(Integer mbrId, Integer prjtId);

    /**
     * Retrieves and returns a list of all tasks associated with a specific project.
     *
     * @param prjtId The ID of the project.
     * @return A list of TaskResponseDto objects representing the tasks in the project.
     */
    List<TaskResponseDto> findTasksByProject(Integer prjtId);
}
