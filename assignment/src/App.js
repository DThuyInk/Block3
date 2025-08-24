import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FigureProvider } from "./contexts/FigureContext";
import { CartProvider } from "./contexts/CartContext";
import Login from "./pages/Login";
import FigureList from "./pages/FigureList";
import FigureDetails from "./pages/FigureDetails";
import Cart from "./pages/Cart";
import Favourites from './pages/Favourites';
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
    <FigureProvider>
      <CartProvider>
        <Router>
          <Navigation user={user} onLogout={handleLogout} />
          <Routes>
              <Route path="/" element={<Navigate to="/figures" replace />} />
              <Route path="/figures" element={<FigureList />} />
              <Route path="/view/:id" element={<FigureDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<Navigate to="/figures" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </FigureProvider>
  );
}

export default App;
