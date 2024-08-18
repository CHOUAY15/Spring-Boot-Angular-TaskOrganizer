package com.ocp.gestionprojet.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.TaskMapper;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskRequestDto;
import com.ocp.gestionprojet.api.model.dto.taskDto.TaskResponseDto;
import com.ocp.gestionprojet.api.model.entity.MemberEntity;
import com.ocp.gestionprojet.api.model.entity.ProjectEntity;
import com.ocp.gestionprojet.api.model.entity.TaskEntity;
import com.ocp.gestionprojet.api.repository.MemberRepository;
import com.ocp.gestionprojet.api.repository.ProjectRepository;
import com.ocp.gestionprojet.api.repository.TaskRepository;
import com.ocp.gestionprojet.api.service.interfaces.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository; // Injects the repository for TaskEntity operations

    @Autowired
    private TaskMapper taskMapper; // Injects the mapper to convert between TaskEntity and TaskResponseDto

    @Autowired
    private MemberRepository memberRepository; // Injects the repository for MemberEntity operations

    @Autowired
    private ProjectRepository projectRepository; // Injects the repository for ProjectEntity operations

    @Override
    @Transactional
    public TaskResponseDto update(TaskRequestDto taskRequestDto, Integer id) throws EntityNotFoundException {
        // Fetches the existing TaskEntity by id, throws exception if not found
        TaskEntity existingTaskEntity = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
    
        // Fetches the MemberEntity by id, throws exception if not found
        MemberEntity memberEntity = memberRepository.findById(taskRequestDto.getMembreId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + taskRequestDto.getMembreId()));
    
        // Update existingTaskEntity with non-null properties from taskRequestDto
        taskMapper.updateEntityFromDto(taskRequestDto, existingTaskEntity);
    
        // Set the member entity
        existingTaskEntity.setMember(memberEntity);
    
        // Save the updated task entity and map it to a DTO
        TaskEntity updatedTask = taskRepository.save(existingTaskEntity);
        return taskMapper.toDto(updatedTask);
    }
    

    @Override
    public void delete(Integer id) {
        // Deletes the task entity by id
        taskRepository.deleteById(id);
    }

    @Override
    @Transactional
    public TaskResponseDto addTaskToProject(TaskRequestDto taskRequestDto) throws EntityNotFoundException {
        // Fetches the ProjectEntity by id, throws exception if not found
        ProjectEntity project = projectRepository.findById(taskRequestDto.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        // Fetches the MemberEntity by id, throws exception if not found
        MemberEntity member = memberRepository.findById(taskRequestDto.getMembreId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        // Creates a new TaskEntity and sets its properties
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setTitle(taskRequestDto.getTitle());
        taskEntity.setDescription(taskRequestDto.getDescription());
        taskEntity.setDayNbrs(taskRequestDto.getDayNbrs());
        taskEntity.setPriority(taskRequestDto.getPriority());
        taskEntity.setMember(member);
        taskEntity.setProject(project);

        // Saves the new task entity and maps it to a DTO
        TaskEntity savedTask = taskRepository.save(taskEntity);
        return taskMapper.toDto(savedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDto> findTaskByMemberInProject(Integer mbrId, Integer prjtId) {
        // Fetches a list of tasks assigned to a specific member in a specific project
        List<TaskEntity> tasks = taskRepository.findTasksByMemberAndProject(mbrId, prjtId);

        // Maps each TaskEntity to TaskResponseDto and collects them into a list
        return tasks.stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<TaskResponseDto> findTasksByProject(Integer prjtId) {
        // Fetches a list of tasks associated with a specific project
        List<TaskEntity> tasks = taskRepository.findByProjectId(prjtId);

        // Maps each TaskEntity to TaskResponseDto and collects them into a list
        return tasks.stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

}
