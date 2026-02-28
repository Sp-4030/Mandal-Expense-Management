package com.mandal.webapp.Model.Form6;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {
    // JpaRepository provides all CRUD operations

}
