package com.ocp.gestionprojet.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.model.dto.memberDto.MemberDto;
import com.ocp.gestionprojet.api.service.interfaces.MemberService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    /**
     * Retrieves a list of members associated with a specific team.
     *
     * @param teamId ID of the team whose members are to be retrieved.
     * @return ResponseEntity with a list of MemberDto objects and HTTP status 200 OK.
     */
    @GetMapping("/teamId/{teamId}")
    public ResponseEntity<List<MemberDto>> findByTeam(@PathVariable("teamId") Integer teamId) {
        // Call the service method to find members by team ID and return the result with HTTP 200 status
        return new ResponseEntity<>(memberService.findByTeam(teamId), HttpStatus.OK);
    }

    /**
     * Retrieves a list of members managed by a specific manager.
     *
     * @param mgrId ID of the manager whose team members are to be retrieved.
     * @return ResponseEntity with a list of MemberDto objects and HTTP status 200 OK.
     */
    @GetMapping("/mgrId/{mgrId}")
    public ResponseEntity<List<MemberDto>> findByManager(@PathVariable("mgrId") Integer mgrId) {
        // Call the service method to find members by manager ID and return the result with HTTP 200 status
        return new ResponseEntity<>(memberService.findByManager(mgrId), HttpStatus.OK);
    }

    /**
     * Retrieves details of a specific member by ID.
     *
     * @param id ID of the member to be retrieved.
     * @return ResponseEntity with the MemberDto object and HTTP status 200 OK.
     * @throws EntityNotFoundException if the member with the specified ID is not found.
     */
    @GetMapping("/id/{id}")
    public ResponseEntity<MemberDto> findById(@PathVariable("id") Integer id) throws EntityNotFoundException {
        // Call the service method to find a member by ID and return the result with HTTP 200 status
        MemberDto memberDto = memberService.findById(id);
        return new ResponseEntity<>(memberDto, HttpStatus.OK);
    }

    /**
     * Updates an existing member.
     *
     * @param memberDto DTO containing the updated details of the member.
     * @return ResponseEntity with the updated MemberDto and HTTP status 202 Accepted.
     * @throws EntityNotFoundException if the member to be updated is not found.
     */
    @PutMapping("")
    public ResponseEntity<MemberDto> update(@Valid @RequestBody MemberDto memberDto) throws EntityNotFoundException {
        // Call the service method to update the member and return the result with HTTP 202 status
        MemberDto updatedMemberDto = memberService.update(memberDto);
        return new ResponseEntity<>(updatedMemberDto, HttpStatus.ACCEPTED);
    }

    /**
     * Deletes a member by its ID.
     *
     * @param id ID of the member to be deleted.
     * @return ResponseEntity with HTTP status 204 No Content.
     */
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        // Call the service method to delete the member and return HTTP 204 status
        memberService.delete(id);
        return ResponseEntity.noContent().build();
    }
       @GetMapping("")
    public ResponseEntity<List<MemberDto>> findAll() {
        return new ResponseEntity<>(memberService.findAll(), HttpStatus.OK);
    }
}
