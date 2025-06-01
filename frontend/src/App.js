// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/footer';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CustomerDashboard from './components/customer/CustomerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // <-- import App.css for layout styles

// Helpers to get token and role
const isLoggedIn = () => !!localStorage.getItem('token');
const getRole = () => localStorage.getItem('role');

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <div className="container my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Role-protected routes */}
              <Route
                path="/customer/dashboard"
                element={
                  isLoggedIn() && getRole() === 'CUSTOMER' ? (
                    <CustomerDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/admin/dashboard"
                element={
                  isLoggedIn() && getRole() === 'ADMIN' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
