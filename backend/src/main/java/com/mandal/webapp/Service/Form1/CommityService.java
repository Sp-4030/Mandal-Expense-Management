package com.mandal.webapp.Service.Form1;

import com.mandal.webapp.Model.Form1.CommityRepository;
import com.mandal.webapp.Model.Form1.Commity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommityService {

    private final CommityRepository dao;

    @Autowired
    public CommityService(CommityRepository dao) {
        this.dao = dao;
    }

    public List<Commity> getAllData() {
        return dao.findAll(); // Uses built-in JpaRepository method
    }

    public Commity save(Commity Commity) {
        return dao.save(Commity);
    }

    public Commity getById(int id) {
        return dao.findById(id).orElse(null);
    }

    // ✅ Delete by ID
    public void delete(int id) {
        dao.deleteById(id);
    }
}
