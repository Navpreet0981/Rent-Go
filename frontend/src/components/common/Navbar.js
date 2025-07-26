// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username || '';
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? 'bg-dark text-white dark-mode' : 'bg-light text-dark';
    }, [darkMode]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user'); // ✅ remove user too
        window.location.href = '/'; // redirect to home/login
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setShowWelcome((prev) => !prev); // Toggle every 30s
        }, 10000); // 30,000 ms = 30 seconds

        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4`}>
            <Link
                className="navbar-brand d-flex align-items-center gap-2"
                to="/"
                style={{ height: '100%', alignItems: 'center' }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                    alt="RentGo Logo"
                    width="35"
                    height="35"
                    style={{ verticalAlign: 'middle' }}
                />
                <div className="brand-wrapper d-flex align-items-center" style={{ position: 'relative', minHeight: '35px' }}>
                    <span className={`brand-text ${!showWelcome ? 'fade-in' : 'fade-out'}`}>
                        RentGo
                    </span>
                    <span className={`welcome-text ${showWelcome ? 'fade-in' : 'fade-out'}`}>
                        Welcome, {username}
                    </span>
                </div>
            </Link>





            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
                <ul className="navbar-nav me-3 mb-2 mb-lg-0">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {role === 'ADMIN' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                            )}
                            {role === 'CUSTOMER' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/customer/dashboard">Customer Dashboard</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                {/* Dark Mode Toggle */}
                <div className="form-check form-switch text-nowrap">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="modeSwitch"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <label className="form-check-label" htmlFor="modeSwitch">
                        {darkMode ? 'Dark' : 'Light'} Mode
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
