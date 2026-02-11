package com.example.demo.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class DataCleanupService {

    @PersistenceContext
    private EntityManager entityManager;

    private final String[] TABLES = {
            "commity_contribution",
            "previous_year_amount",
            "market",
            "expenses",
            "donations",
            "materials",
            "contributions"
    };

    @Transactional
    public void truncateAll() {
        // Disable foreign key checks to allow truncation safely
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();

        for (String table : TABLES) {
            entityManager.createNativeQuery("TRUNCATE TABLE " + table).executeUpdate();
        }

        // Re-enable foreign key checks
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
    }
}
