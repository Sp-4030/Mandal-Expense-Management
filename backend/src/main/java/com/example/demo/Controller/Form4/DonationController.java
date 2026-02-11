package com.example.demo.Controller.Form4;

import com.example.demo.Model.Form4.Donation;
import com.example.demo.Service.Form4.DonationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:5173") // Update with your React frontend URL
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping("/all")
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    @PostMapping("/add")
    public Donation addDonation(@RequestBody Donation donation) {
        return donationService.addDonation(donation);
    }

    @PutMapping("/update/{id}")
    public Donation updateDonation(@PathVariable Long id, @RequestBody Donation donation) {
        return donationService.updateDonation(id, donation);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
    }
}
