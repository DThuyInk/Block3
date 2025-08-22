import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import { FavouriteProvider } from "./context/FavouriteContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import FavouritePage from "./pages/FavouritePage";
import CartPage from "./pages/CartPage";
import ViewDetailPage from "./pages/ViewDetailPage";
import { ToastProvider } from "./context/ToastContext";
import "./styles.css";

function AppContent() {
  const { user, logout } = useAuth();
  const [page, setPage] = React.useState('landing');
  const [detailDish, setDetailDish] = React.useState(null);

  const handleLogout = () => {
    if (logout) logout();
    setPage('landing');
  };

  if (!user) {
    if (page === 'login') return <LoginPage onBack={() => setPage('landing')} />;
    if (page === 'register') return <RegisterPage onSuccess={() => setPage('login')} />;
    return <LandingPage onLogin={() => setPage('login')} onRegister={() => setPage('register')} />;
  }

  if (page === 'favourite') {
    return <FavouritePage
      onBack={() => setPage('home')}
      onFavourite={() => setPage('favourite')}
      onLogout={handleLogout}
      onGoToCart={() => setPage('cart')}
    />;
  }
  if (page === 'cart') {
    return <CartPage
      onBack={() => setPage('home')}
      onFavourite={() => setPage('favourite')}
      onLogout={handleLogout}
      onGoToCart={() => setPage('cart')}
    />;
  }
  if (page === 'detail') {
    return <ViewDetailPage dish={detailDish} onBack={() => setPage('home')} />;
  }

  return (
    <HomePage
      onFavourite={() => setPage('favourite')}
      onLogout={handleLogout}
      onGoToCart={() => setPage('cart')}
      onViewDetail={(dish) => { setDetailDish(dish); setPage('detail'); }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <FavouriteProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </FavouriteProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;