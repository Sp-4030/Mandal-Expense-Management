package com.mandal.webapp.Controller.Form1;

import com.mandal.webapp.Model.Form1.PreviousYearAmount;
import com.mandal.webapp.Service.Form1.PreviousYearAmountService;
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
