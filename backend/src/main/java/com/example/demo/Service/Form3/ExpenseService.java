package com.example.demo.Service.Form3;


import com.example.demo.Model.Form3.Expense;
import com.example.demo.Model.Form3.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    // Add new expense
    public Expense addExpense(Expense expense) {
        return repository.save(expense);
    }

    // Update existing expense
    public Expense updateExpense(Long id, Expense updatedExpense) {
        Optional<Expense> optional = repository.findById(id);
        if (optional.isPresent()) {
            Expense expense = optional.get();
            expense.setMaterial(updatedExpense.getMaterial());
            expense.setPerson(updatedExpense.getPerson());
            expense.setExpense(updatedExpense.getExpense());
            return repository.save(expense);
        } else {
            return null;
        }
    }

    // Delete expense
    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }

    // Get expense by ID
    public Optional<Expense> getExpenseById(Long id) {
        return repository.findById(id);
    }
}
