package com.example.demo.Service.Form4;


import com.example.demo.Model.Form4.Donation;
import com.example.demo.Model.Form4.DonationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    private final DonationRepository donationRepository;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    public Donation addDonation(Donation donation) {
        return donationRepository.save(donation);
    }

    public Donation updateDonation(Long id, Donation donationDetails) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found with id " + id));
        donation.setName(donationDetails.getName());
        donation.setAmount(donationDetails.getAmount());
        return donationRepository.save(donation);
    }

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
