package com.example.demo.Controller.Form2;


import com.example.demo.Model.Form2.Market;
import com.example.demo.Service.Form2.MarketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for your React frontend
public class MarketController {

    private final MarketService marketService;

    public MarketController(MarketService marketService) {
        this.marketService = marketService;
    }

    @GetMapping("/all")
    public List<Market> getAll() {
        return marketService.getAll();
    }

    @PostMapping("/add")
    public Market add(@RequestBody Market market) {
        return marketService.save(market);
    }

    @PutMapping("/update/{id}")
    public Market update(@PathVariable Long id, @RequestBody Market market) {
        return marketService.update(id, market);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        boolean deleted = marketService.delete(id);
        return deleted ? "Deleted successfully" : "Record not found";
    }
}
