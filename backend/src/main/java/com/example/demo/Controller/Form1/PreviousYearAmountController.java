package com.example.demo.Controller.Form1;

import com.example.demo.Model.Form1.PreviousYearAmount;
import com.example.demo.Service.Form1.PreviousYearAmountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/previous-year")
public class PreviousYearAmountController {

    private final PreviousYearAmountService service;

    @Autowired
    public PreviousYearAmountController(PreviousYearAmountService service) {
        this.service = service;
    }

    @GetMapping
    public PreviousYearAmount getPreviousYearAmount() {
        return service.getAmount();
    }

    @PutMapping
    public PreviousYearAmount updateAmount(@RequestBody PreviousYearAmount payload) {
        return service.saveOrUpdate(payload.getAmount());
    }

}
