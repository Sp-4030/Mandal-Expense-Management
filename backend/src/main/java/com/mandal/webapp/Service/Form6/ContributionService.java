package com.mandal.webapp.Service.Form6;


import com.mandal.webapp.Model.Form6.Contribution;
import com.mandal.webapp.Model.Form6.ContributionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContributionService {

    private final ContributionRepository repository;

    public ContributionService(ContributionRepository repository) {
        this.repository = repository;
    }

    public List<Contribution> getAll() {
        return repository.findAll();
    }

    public Contribution add(Contribution contribution) {
        return repository.save(contribution);
    }

    public Contribution update(Long id, Contribution contribution) {
        Optional<Contribution> existing = repository.findById(id);
        if (existing.isPresent()) {
            Contribution c = existing.get();
            c.setName(contribution.getName());
            c.setAmount(contribution.getAmount());
            return repository.save(c);
        }
        return null;
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
