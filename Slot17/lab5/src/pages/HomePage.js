import React from 'react';

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DishesList from "../components/DishesList";
import dishes from "../data/dishes";
import { useTheme } from "../context/ThemeContext";

const HomePage = ({ onFavourite, onLogout, onGoToCart, onViewDetail }) => {
  const { darkMode } = useTheme();
  const appStyle = {
    background: darkMode ? "#222" : "#f5f5f5",
    color: darkMode ? "#fff" : "#222",
    minHeight: "100vh",
    transition: "all 0.3s",
  };
  return (
    <div style={appStyle}>
  <NavBar onFavourite={onFavourite} onLogout={onLogout} onGoToCart={onGoToCart} />
      <div className="App container py-4">
        {/* Carousel ảnh món ăn */}
        <div className="mb-4">
          {/* Carousel component */}
          {React.createElement(require('../components/ImageCarousel').default)}
        </div>
        <DishesList
          dishes={dishes}
          onGoToCart={onGoToCart}
          onViewDetail={onViewDetail}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
