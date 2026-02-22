package com.mandal.webapp.Controller.Form6;


import com.mandal.webapp.Model.Form6.Contribution;
import com.mandal.webapp.Service.Form6.ContributionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributions")
@CrossOrigin(origins = "http://localhost:5173")
public class ContributionController {

    private final ContributionService service;

    public ContributionController(ContributionService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<Contribution> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public Contribution add(@RequestBody Contribution contribution) {
        return service.add(contribution);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Contribution> update(@PathVariable Long id, @RequestBody Contribution contribution) {
        Contribution updated = service.update(id, contribution);
        if (updated != null) return ResponseEntity.ok(updated);
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = service.delete(id);
        if (deleted) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}
