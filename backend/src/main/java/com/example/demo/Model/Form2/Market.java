package com.example.demo.Model.Form2;

import jakarta.persistence.*;

@Entity
@Table(name = "market")
public class Market {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String material;
    private String buyer;
    private double expense;


    public Market() {
    }

    public Market(Long id, String material, String buyer, double expense, int year) {
        this.id = id;
        this.material = material;
        this.buyer = buyer;
        this.expense = expense;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public double getExpense() {
        return expense;
    }

    public void setExpense(double expense) {
        this.expense = expense;
    }


}
