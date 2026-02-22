package com.mandal.webapp.Service.Form2;


import com.mandal.webapp.Model.Form2.Market;
import com.mandal.webapp.Model.Form2.MarketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarketService {

    private final MarketRepository marketRepository;

    public MarketService(MarketRepository marketRepository) {
        this.marketRepository = marketRepository;
    }

    public List<Market> getAll() {
        return marketRepository.findAll();
    }

    public Market getById(Long id) {
        return marketRepository.findById(id).orElse(null);
    }

    public Market save(Market market) {
        return marketRepository.save(market);
    }

    public Market update(Long id, Market market) {
        Optional<Market> existing = marketRepository.findById(id);
        if (existing.isPresent()) {
            Market m = existing.get();
            m.setMaterial(market.getMaterial());
            m.setBuyer(market.getBuyer());
            m.setExpense(market.getExpense());
            return marketRepository.save(m);
        }
        return null;
    }

    public boolean delete(Long id) {
        if (marketRepository.existsById(id)) {
            marketRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
