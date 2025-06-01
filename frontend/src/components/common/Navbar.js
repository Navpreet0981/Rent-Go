// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

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
        window.location.href = '/'; // redirect to login page after logout
    };

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4`}>
            <Link className="navbar-brand d-flex align-items-center" to="/">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" // Car logo icon
                    alt="RentGo Logo"
                    width="35"
                    height="35"
                    className="me-2"
                />
                <strong>RentGo</strong>
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
