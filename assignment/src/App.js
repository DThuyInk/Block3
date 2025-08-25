import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FigureProvider } from "./contexts/FigureContext";
import { CartProvider } from "./contexts/CartContext";
import Login from "./pages/Login";
import FigureList from "./pages/FigureList";
import FigureDetails from "./pages/FigureDetails";
import Cart from "./pages/Cart";
import Favourites from './pages/Favourites';
import LandingPage from './pages/LandingPage';
import Navigation from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <FigureProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<LandingPage />} />
              <Route path="/view/:id" element={<FigureDetails />} />
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
