package com.example.demo.Ai;

import com.example.demo.Model.Form1.Commity;
import com.example.demo.Model.Form1.CommityRepository;

import com.example.demo.Model.Form1.PreviousYearAmountDao;
import com.example.demo.Model.Form2.Market;
import com.example.demo.Model.Form2.MarketRepository;
import com.example.demo.Model.Form3.Expense;
import com.example.demo.Model.Form3.ExpenseRepository;
import com.example.demo.Model.Form4.Donation;
import com.example.demo.Model.Form4.DonationRepository;
import com.example.demo.Model.Form5.Material;
import com.example.demo.Model.Form5.MaterialRepository;
import com.example.demo.Model.Form6.Contribution;
import com.example.demo.Model.Form6.ContributionRepository;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final GeminiService geminiService;
    private final CommityRepository form0Repo;
    private final DonationRepository donationRepo;
    private final ExpenseRepository expenseRepo;
    private final PreviousYearAmountDao previousYearAmountDao;
    private final MarketRepository marketRepository;
    private final MaterialRepository materialRepository;
    private final ContributionRepository contributionRepository;

    public ChatController(GeminiService geminiService,
                          CommityRepository form0Repo,
                          DonationRepository donationRepo,
                          ExpenseRepository expenseRepo,
                          PreviousYearAmountDao previousYearAmountDao,
                          MarketRepository marketRepository,
                          MaterialRepository materialRepository,
                          ContributionRepository contributionRepository) {
        this.geminiService = geminiService;
        this.form0Repo = form0Repo;
        this.donationRepo = donationRepo;
        this.expenseRepo = expenseRepo;
        this.previousYearAmountDao = previousYearAmountDao;
        this.marketRepository = marketRepository;
        this.materialRepository = materialRepository;
        this.contributionRepository = contributionRepository;
    }

    @PostMapping
    public String chat(@RequestBody String userMessage) throws IOException {

        StringBuilder dbInfo = new StringBuilder();
        String lowerMsg = userMessage.toLowerCase();

        // --- Donations ---
        if (containsAny(lowerMsg,
                "donation", "donations",
                "देणगी", "देणग्या","देणगीदार")) {

            List<Donation> donations = donationRepo.findAll();
            double total = donations.stream()
                    .mapToDouble(Donation::getAmount)
                    .sum();

            dbInfo.append("Total donations = ").append(total).append("\n");
            dbInfo.append("Donation details:\n");

            donations.forEach(d -> dbInfo.append(d.getName())
                    .append(" - ")
                    .append(d.getAmount())
                    .append("\n"));
        }

        // --- Contributions ---
        if (containsAny(lowerMsg,
                "contribution", "contributions",
                "योगदान")) {

            List<Contribution> contributions = contributionRepository.findAll();
            double totalContribution = contributions.stream()
                    .mapToDouble(Contribution::getAmount)
                    .sum();

            dbInfo.append("Total contributions = ")
                    .append(totalContribution).append("\n");
            dbInfo.append("Contribution details:\n");

            contributions.forEach(c -> dbInfo.append(c.getName())
                    .append(" - ")
                    .append(c.getAmount())
                    .append("\n"));
        }

        // --- Committee ---
        if (containsAny(lowerMsg,
                "committee",
                "committee contribution",
                "समिती",
                "समिती योगदान")) {

            List<Commity> committees = form0Repo.findAll();
            int total = committees.stream()
                    .mapToInt(Commity::getAmount)
                    .sum();

            dbInfo.append("Total committee contribution = ")
                    .append(total).append("\n");
            dbInfo.append("Committee details:\n");

            committees.forEach(c -> dbInfo.append(c.getName())
                    .append(" - ")
                    .append(c.getAmount())
                    .append("\n"));
        }

        // --- Expenses ---
        if (containsAny(lowerMsg,
                "expense", "expenses",
                "total expense",
                "spent amount",
                "खर्च", "एकूण खर्च", "झालेला खर्च")) {

            List<Expense> expenses = expenseRepo.findAll();
            double totalExpense = expenses.stream()
                    .mapToDouble(Expense::getExpense)
                    .sum();

            dbInfo.append("Total expenses = ")
                    .append(totalExpense).append("\n");
            dbInfo.append("Expense details:\n");

            expenses.forEach(e -> dbInfo.append(e.getPerson())
                    .append(" - ")
                    .append(e.getExpense())
                    .append("\n"));
        }

        // --- Previous Year ---
        if (containsAny(lowerMsg,
                "previous year",
                "last year",
                "मागील वर्ष")) {

            var prevAmounts = previousYearAmountDao.findAll();
            double totalPrev = prevAmounts.stream()
                    .mapToDouble(p -> p.getAmount())
                    .sum();

            dbInfo.append("Total previous year amount = ")
                    .append(totalPrev).append("\n");
        }

        // --- Market ---
        if (containsAny(lowerMsg,
                "market",
                "market expense",
                "बाजार",
                "बाजार खर्च")) {

            List<Market> markets = marketRepository.findAll();
            double totalMarket = markets.stream()
                    .mapToDouble(Market::getExpense)
                    .sum();

            dbInfo.append("Total market expenses = ")
                    .append(totalMarket).append("\n");
            dbInfo.append("Market details:\n");

            markets.forEach(m -> dbInfo.append(m.getMaterial())
                    .append(" - ")
                    .append(m.getBuyer())
                    .append(" - ")
                    .append(m.getExpense())
                    .append("\n"));
        }

        // --- Materials ---
        if (containsAny(lowerMsg,
                "material", "materials",
                "साहित्य")) {

            List<Material> materials = materialRepository.findAll();

            dbInfo.append("Materials list:\n");

            materials.forEach(m -> dbInfo.append(m.getName())
                    .append(" - ")
                    .append(m.getMaterial())
                    .append("\n"));
        }

        // --- Income / Amount / Balance ---
        if (containsAny(lowerMsg,
                "income", "total income",
                "उत्पन्न", "एकूण उत्पन्न",
                "amount", "total amount",
                "रक्कम", "एकूण रक्कम",
                "balance", "remaining balance",
                "शिल्लक", "उर्वरित शिल्लक")) {

            dbInfo.append("Income/Amount/Balance related information requested.\n");
        }

        // If nothing matched
        if (dbInfo.length() == 0) {
            dbInfo.append("No related financial data found.\n");
        }

        String prompt = userMessage + "\n\nDatabase info:\n" + dbInfo.toString();

        return geminiService.askGemini(prompt);
    }


    /* Helper Method */
    private boolean containsAny(String message, String... keywords) {
        for (String keyword : keywords) {
            if (message.contains(keyword.toLowerCase())) {
                return true;
            }
        }
        return false;
    }


}
