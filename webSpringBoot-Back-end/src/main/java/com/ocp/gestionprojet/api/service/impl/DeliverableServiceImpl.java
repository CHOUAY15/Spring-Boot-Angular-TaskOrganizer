package com.ocp.gestionprojet.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.gestionprojet.api.repository.DeliverableRepository;
import com.ocp.gestionprojet.api.service.interfaces.DeliverableService;

@Service

public class DeliverableServiceImpl implements DeliverableService {

    @Autowired
    private DeliverableRepository deliverableRepository;

    @Override
    public void delete(Integer id) {
        this.deliverableRepository.deleteById(id);
    }
    
}
