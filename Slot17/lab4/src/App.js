import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import dishes from "./data/dishes";

function AppContent() {
  const { darkMode } = useTheme();
  const appStyle = {
    background: darkMode ? "#222" : "#f5f5f5",
    color: darkMode ? "#fff" : "#222",
    minHeight: "100vh",
    transition: "all 0.3s",
  };

  return (
    <CartProvider>
      <NavBar />
      <div className="App container py-4" style={appStyle}>
        <div className="row">
          <div className="col-md-8 mb-4">
            <DishesList dishes={dishes} />
          </div>
          <div className="col-md-4">
            <Cart />
          </div>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
