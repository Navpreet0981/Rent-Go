// src/components/customer/CustomerDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // must be stored at login

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:8080/api/bookings/user/${user.id}`)
                .then((res) => setBookings(res.data))
                .catch((err) => console.error("Error fetching bookings:", err));
        }
    }, [user]);

    if (!user) {
        return <div className="container py-5">Please log in to view your bookings.</div>;
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Welcome, {user.name}!</h2>
            <h4>Your Bookings</h4>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="row">
                    {bookings.map((booking) => {
                        const car = booking.car;
                        if (!car) return null; // ⛔️ Skip rendering this booking if car is undefined

                        return (
                            <div key={booking.id} className="col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <img
                                        src={car.imageUrl}
                                        className="card-img-top"
                                        alt={car.model}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {car.brand} {car.model}
                                        </h5>
                                        <p><strong>From:</strong> {booking.startDate}</p>
                                        <p><strong>To:</strong> {booking.endDate}</p>
                                        <p><strong>Price/Day:</strong> ₹{car.pricePerDay}</p>
                                        <p>
                                            <strong>Total:</strong> ₹
                                            {(
                                                ((new Date(booking.endDate) - new Date(booking.startDate)) /
                                                    (1000 * 60 * 60 * 24)) *
                                                car.pricePerDay
                                            ).toFixed(0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            )}
        </div>
    );
};

export default CustomerDashboard;
