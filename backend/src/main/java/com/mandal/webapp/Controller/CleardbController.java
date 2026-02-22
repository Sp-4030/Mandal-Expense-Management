package com.mandal.webapp.Controller;

import com.mandal.webapp.Service.DataCleanupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CleardbController {

    private final DataCleanupService dataCleanupService;

    public CleardbController(DataCleanupService dataCleanupService) {
        this.dataCleanupService = dataCleanupService;
    }

    @DeleteMapping("/truncate-all")
    public ResponseEntity<String> truncateAllTables() {
        try {
            dataCleanupService.truncateAll();
            return ResponseEntity.ok("All tables truncated successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error while truncating tables: " + e.getMessage());
        }
    }
}
