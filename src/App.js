import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MotorbikeProvider } from "./contexts/MotorbikeContext";
import { CartProvider } from "./contexts/CartContext";
import Login from "./components/Login";
import MotorbikeList from "./components/MotorbikeList";
import MotorbikeDetails from "./components/MotorbikeDetails";
import Cart from "./components/Cart";
import Navigation from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(() => {
    // Get user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user to localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <Router>
        <Login setUser={setUser} />
      </Router>
    );
  }

  return (
    <MotorbikeProvider>
      <CartProvider>
        <Router>
          <Navigation user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/motorbikes" replace />} />
            <Route path="/motorbikes" element={<MotorbikeList />} />
            <Route path="/view/:id" element={<MotorbikeDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/motorbikes" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </MotorbikeProvider>
  );
}

export default App;
