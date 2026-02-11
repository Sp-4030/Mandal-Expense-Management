package com.example.demo.Controller.Form3;


import com.example.demo.Model.Form3.Expense;
import com.example.demo.Service.Form3.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from frontend (explicit origin required when allowCredentials=true)
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    // GET all
    @GetMapping("/all")
    public List<Expense> getAllExpenses() {
        return service.getAllExpenses();
    }

    // POST add
    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense) {
        return service.addExpense(expense);
    }

    // PUT update
    @PutMapping("/update/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return service.updateExpense(id, expense);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
    }
}
