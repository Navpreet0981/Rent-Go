package com.rentgo.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.EAGER) //  EAGER fetch to include car details
    @JoinColumn(name = "car_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Fix for JSON serialization
    private Car car;

    private Long userId;

    public Booking() {}

    public Booking(LocalDate startDate, LocalDate endDate, Car car, Long userId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.car = car;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
