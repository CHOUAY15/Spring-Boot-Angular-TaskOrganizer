package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskRequestDto;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskResponseDto;

public interface TaskService {

    // Update an existing task with the given ID using the provided data
    TaskResponseDto update(TaskRequestDto taskRequestDto, Integer id) throws EntityNotFoundException;

    // Delete a task by its ID
    void delete(Integer id);

    // Add a new task to a specified project
    TaskResponseDto addTaskToProject(TaskRequestDto taskRequestDto) throws EntityNotFoundException;

    // Find and return a list of tasks assigned to a specific member within a project
    List<TaskResponseDto> findTaskByMemberInProject(Integer mbrId, Integer prjtId);

    // Retrieve and return a list of all tasks associated with a specific project
    List<TaskResponseDto> findTasksByProject(Integer prjtId);
}
