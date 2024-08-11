package com.ocp.gestionprojet.service.interfaces;

import com.ocp.gestionprojet.exception.EntityNotFoundException;
import com.ocp.gestionprojet.model.dto.RepondreDto;
import com.ocp.gestionprojet.model.dto.RepondreRequestDto;

public interface RepondreService {

    RepondreDto addReponseToComment(RepondreRequestDto repondreRequestDto) throws EntityNotFoundException;

    void deleteReponsebyId(Integer id);
    RepondreDto updateReponse(RepondreRequestDto repondreRequestDto,Integer id) throws EntityNotFoundException;


    
}
