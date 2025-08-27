import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FigureProvider } from "./contexts/FigureContext";
import { CartProvider } from "./contexts/CartContext";
import Login from "./pages/Login";
import FigureList from "./pages/FigureList";
import FigureDetails from "./pages/FigureDetails";
import Cart from "./pages/Cart";
import Favourites from './pages/Favourites';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Navigation from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, login, logout } = useAuth();

  // Hydrate AuthContext từ localStorage khi app khởi động
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && !user) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed) login(parsed);
      } catch (e) {
        console.error("Invalid user in localStorage:", e);
        localStorage.removeItem("user");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // chỉ chạy 1 lần khi mount

  // Đồng bộ user vào localStorage mỗi khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  if (!user) {
    return (
      <FigureProvider>
        <CartProvider>
          <Router>
            <Navigation user={null} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/view/:id" element={<FigureDetails />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </FigureProvider>
    );
  }

  return (
    <FigureProvider>
      <CartProvider>
        <Router>
          <Navigation user={user} onLogout={logout} />
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