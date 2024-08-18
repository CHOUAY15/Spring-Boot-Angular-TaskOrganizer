package com.ocp.gestionprojet.api.service.interfaces;

import java.util.List;
import com.ocp.gestionprojet.api.model.dto.sectionDto.SectionDto;

/**
 * Interface defining the contract for managing sections (departments) within the system.
 * Provides methods for retrieving, saving, and deleting sections.
 */
public interface SectionService {

    /**
     * Retrieves all sections in the system.
     *
     * @return A list of {@link SectionDto} representing all sections.
     */
    List<SectionDto> findAll();

    /**
     * Saves a new section or updates an existing one.
     *
     * @param sectionDto The data transfer object containing section details to be saved.
     * @return The saved or updated {@link SectionDto}.
     */
    SectionDto save(SectionDto sectionDto);

    /**
     * Deletes a section by its ID.
     *
     * @param id The ID of the section to be deleted.
     */
    void delete(Integer id);
}
