package com.ocp.gestionprojet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskRequestDto;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskResponseDto;
import com.ocp.gestionprojet.api.service.interfaces.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    /**
     * Adds a new task to a project.
     *
     * @param taskRequestDto DTO containing the details of the task to be added.
     * @return ResponseEntity with the saved TaskResponseDto and HTTP status 201 Created.
     * @throws EntityNotFoundException if the project or member associated with the task is not found.
     */
    @PostMapping("")
    public ResponseEntity<TaskResponseDto> addTaskToProject(@Valid @RequestBody TaskRequestDto taskRequestDto) throws EntityNotFoundException {
        // Call the service method to add the task and return the result with HTTP 201 status
        TaskResponseDto taskDto = taskService.addTaskToProject(taskRequestDto);
        return new ResponseEntity<>(taskDto, HttpStatus.CREATED);
    }

    /**
     * Updates an existing task.
     *
     * @param id ID of the task to be updated.
     * @param taskRequestDto DTO containing the new details of the task.
     * @return ResponseEntity with the updated TaskResponseDto and HTTP status 202 Accepted.
     * @throws EntityNotFoundException if the task with the specified ID is not found.
     */
    @PutMapping("/id/{id}")
    public ResponseEntity<TaskResponseDto> update(@PathVariable("id") Integer id, @Valid @RequestBody TaskRequestDto taskRequestDto) throws EntityNotFoundException {
        // Call the service method to update the task and return the result with HTTP 202 status
        TaskResponseDto updatedTaskDto = taskService.update(taskRequestDto, id);
        return new ResponseEntity<>(updatedTaskDto, HttpStatus.ACCEPTED);
    }

    /**
     * Deletes a task by its ID.
     *
     * @param id ID of the task to be deleted.
     * @return ResponseEntity with HTTP status 204 No Content.
     */
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        // Call the service method to delete the task and return HTTP 204 status
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves tasks assigned to a specific member within a specific project.
     *
     * @param mbrId ID of the member whose tasks are to be retrieved.
     * @param prjtId ID of the project within which tasks are to be retrieved.
     * @return ResponseEntity with a list of TaskResponseDto objects and HTTP status 200 OK.
     * @throws EntityNotFoundException if no tasks are found for the specified member and project.
     */
    @GetMapping("/mbrId/{mbrId}/prjtId/{prjtId}")
    public ResponseEntity<List<TaskResponseDto>> findTaskByMemberInProject(@PathVariable("mbrId") Integer mbrId, @PathVariable("prjtId") Integer prjtId) throws EntityNotFoundException {
        // Call the service method to find tasks by member and project and return the result with HTTP 200 status
        return new ResponseEntity<>(taskService.findTaskByMemberInProject(mbrId, prjtId), HttpStatus.OK);
    }

    /**
     * Retrieves all tasks associated with a specific project.
     *
     * @param prjtId ID of the project whose tasks are to be retrieved.
     * @return ResponseEntity with a list of TaskResponseDto objects and HTTP status 200 OK.
     * @throws EntityNotFoundException if no tasks are found for the specified project.
     */
    @GetMapping("/prjtId/{prjtId}")
    public ResponseEntity<List<TaskResponseDto>> findTasksByProject(@PathVariable("prjtId") Integer prjtId) throws EntityNotFoundException {
        // Call the service method to find tasks by project ID and return the result with HTTP 200 status
        return new ResponseEntity<>(taskService.findTasksByProject(prjtId), HttpStatus.OK);
    }
}
