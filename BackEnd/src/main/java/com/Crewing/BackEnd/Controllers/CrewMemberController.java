package com.Crewing.BackEnd.Controllers;

import com.Crewing.BackEnd.Models.CrewMember;
import com.Crewing.BackEnd.Services.CrewMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crewmembers")
public class CrewMemberController {

    @Autowired
    private CrewMemberService crewMemberService;

    @PostMapping("/crew-members")
    public ResponseEntity<CrewMember> createCrewMember(@RequestBody CrewMember crewMember) {
        CrewMember newCrewMember = crewMemberService.saveCrewMember(crewMember);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCrewMember);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<CrewMember> getCrewMemberById(@PathVariable Long id) {
        CrewMember crewMember = crewMemberService.getCrewMemberById(id);
        return crewMember != null
                ? new ResponseEntity<>(crewMember, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<CrewMember>> getAllCrewMembers() {
        List<CrewMember> crewMembers = crewMemberService.getAllCrewMembers();
        return new ResponseEntity<>(crewMembers, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CrewMember> updateCrewMember(@PathVariable Long id, @RequestBody CrewMember crewMember) {
        crewMember.setId(id);
        CrewMember updatedCrewMember = crewMemberService.saveCrewMember(crewMember);
        return new ResponseEntity<>(updatedCrewMember, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrewMember(@PathVariable Long id) {
        crewMemberService.deleteCrewMember(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}