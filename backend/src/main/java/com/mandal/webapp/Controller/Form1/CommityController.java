package com.mandal.webapp.Controller.Form1;

import com.mandal.webapp.Model.Form1.Commity;
import com.mandal.webapp.Service.Form1.CommityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // allow frontend (Vite React)
@RestController
@RequestMapping("/api") // Base path for all endpoints
public class CommityController {

    private final CommityService commityService;

    @Autowired
    public CommityController(CommityService commityService) {
        this.commityService = commityService;
    }

    // GET all records
    @GetMapping("/all")
    public List<Commity> getAllData() {
        return commityService.getAllData();
    }

    // GET by ID
    @GetMapping("/{id}")
    public Commity getById(@PathVariable int id) {
        return commityService.getById(id);
    }

    // POST - create new record
    @PostMapping("/add")
    public Commity addData(@RequestBody Commity Commity) {
        return commityService.save(Commity);
    }

    // PUT - update record by ID
    @PutMapping("/update/{id}")
    public Commity updateData(@PathVariable int id, @RequestBody Commity updated) {
        updated.setId(id); // ensure correct ID
        return commityService.save(updated);
    }

    // DELETE - delete record by ID
    @DeleteMapping("/delete/{id}")
    public String deleteData(@PathVariable int id) {
        commityService.delete(id);
        return "Record with ID " + id + " deleted successfully!";
    }


}
