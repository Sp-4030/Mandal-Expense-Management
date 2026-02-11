package com.example.demo.Model.Form1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreviousYearAmountDao extends JpaRepository<PreviousYearAmount, Long> {

}
