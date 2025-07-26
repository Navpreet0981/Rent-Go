package com.rentgo.backend.controller;

import com.rentgo.backend.dto.BookingDTO;
import com.rentgo.backend.model.Booking;
import com.rentgo.backend.model.Car;
import com.rentgo.backend.repository.BookingRepository;
import com.rentgo.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO dto) {
        Car car = carRepository.findById(dto.getCarId()).orElse(null);

        if (car == null || !car.isAvailable()) {
            return ResponseEntity.badRequest().body("Car not available.");
        }

        Booking booking = new Booking(
                dto.getStartDate(),
                dto.getEndDate(),
                car,
                dto.getUserId()
        );

        bookingRepository.save(booking);

        // Optional: set car as unavailable
        car.setAvailable(false);
        carRepository.save(car);

        return ResponseEntity.ok("Booking successful");
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}
