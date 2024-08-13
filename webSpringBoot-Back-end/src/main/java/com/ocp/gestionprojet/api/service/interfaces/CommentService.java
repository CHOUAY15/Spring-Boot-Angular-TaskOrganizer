package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.commentDto.CommentRequestDto;
import com.ocp.gestionprojet.api.model.dto.commentDto.CommentResponseDto;

public interface CommentService {

    // Add a new comment to a task by a specific member
    CommentRequestDto addCommentToTaskByMember(CommentResponseDto commentResponseDto) throws EntityNotFoundException;

    // Update an existing comment with the given ID using the provided data
    CommentRequestDto update(CommentResponseDto commentaireRequestDto, Integer id) throws EntityNotFoundException;

    // Find and return a list of comments associated with a specific task
    List<CommentRequestDto> findCommentsByTask(Integer tacheId);

    // Delete a comment by its ID
    void delete(Integer id);
}
