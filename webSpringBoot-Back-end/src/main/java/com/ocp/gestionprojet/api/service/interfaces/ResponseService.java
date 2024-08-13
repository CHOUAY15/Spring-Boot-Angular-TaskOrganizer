package com.ocp.gestionprojet.api.service.interfaces;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.responseDto.ResponseDto;
import com.ocp.gestionprojet.api.model.dto.responseDto.ResponseRequestDto;

public interface ResponseService {

    // Add a new response to a specified comment
    ResponseDto addResponseToComment(ResponseRequestDto responseRequestDto) throws EntityNotFoundException;

    // Delete a response by its ID
    void delete(Integer id);

    // Update an existing response with the given ID using the provided data
    ResponseDto update(ResponseRequestDto responseRequestDto, Integer id) throws EntityNotFoundException;
}
