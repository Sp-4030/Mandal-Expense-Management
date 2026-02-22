package com.mandal.webapp.Service.Form1;

import com.mandal.webapp.Model.Form1.PreviousYearAmount;
import com.mandal.webapp.Model.Form1.PreviousYearAmountDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreviousYearAmountService {

    private final PreviousYearAmountDao dao;

    @Autowired
    public PreviousYearAmountService(PreviousYearAmountDao dao) {
        this.dao = dao;
    }

    public PreviousYearAmount getAmount() {
        return dao.findAll().stream().findFirst().orElse(null);
    }

    public PreviousYearAmount saveOrUpdate(int amount) {
        PreviousYearAmount record = getAmount();
        if (record == null) {
            record = new PreviousYearAmount();
        }
        record.setAmount(amount);
        return dao.save(record);
    }
}
