import React, { useState, useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";

function NavBar({ onFavourite, onLogout, onGoToCart }) {
  const { darkMode, setDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  return (
    <nav
      className="navbar navbar-expand-lg mb-3"
      style={{
        transition: 'background 0.3s, color 0.3s',
        background: darkMode ? '#222' : 'linear-gradient(90deg, #fffbe6 0%, #ffe0b2 100%)',
        color: darkMode ? '#fff' : '#b71c1c',
        boxShadow: '0 2px 8px rgba(183,28,28,0.08)'
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#home" style={{ background: 'none' }}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" style={{height: 38, marginRight: 8, borderRadius: '50%', boxShadow: '0 2px 8px rgba(183,28,28,0.12)'}} />
          <span style={{ background: 'none', color: '#b71c1c', fontFamily: 'serif', fontSize: '2.5rem', letterSpacing: '2px' }}>Food Order App</span>
        </a>
  <div className="collapse navbar-collapse" style={{ background: 'none' }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ background: 'none' }}>
            <li className="nav-item"><a className="nav-link" href="#home" style={{ background: 'none', color: '#b71c1c', fontWeight: 600, fontSize: '1.3rem' }}>Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu" style={{ background: 'none', color: '#b71c1c', fontWeight: 600, fontSize: '1.3rem' }}>Thực đơn</a></li>
            <li className="nav-item">
              <button
                className={"nav-link btn btn-outline-primary px-3 py-1 d-flex align-items-center"}
                style={{ borderRadius: 20, fontWeight: 500, background: 'none', border: 'none', boxShadow: 'none', gap: 6, olor: darkMode ? '#fff' : '#222', boxShadow: '0 2px 8px rgba(183,28,28,0.08)', fontSize: '1.3rem', transition: 'color 0.3s' }}
                onClick={onGoToCart}
              >
                <span>Giỏ hàng</span>
                {cartCount > 0 && (
                  <span className="badge bg-danger" style={{fontSize: 12, borderRadius: '50%', minWidth: 20, minHeight: 20, lineHeight: '20px', display: 'inline-block', textAlign: 'center'}}>{cartCount}</span>
                )}
              </button>
            </li>
          </ul>
          <div className="dropdown ms-3" style={{ position: 'relative', background: 'none' }}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-expanded={dropdownOpen}
              style={{ background: 'none', olor: darkMode ? '#fff' : '#222', boxShadow: '0 2px 8px rgba(183,28,28,0.08)', fontWeight: 600, fontSize: '1.1rem', border: 'none', transition: 'color 0.3s' }}
            >
              Tài khoản
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu show" style={{ position: 'absolute', right: 0, background: 'none' , color: darkMode ? '#fff' : '#222', boxShadow: '0 2px 8px rgba(183,28,28,0.08)' }}>
                <li>
                  <button className="dropdown-item" onClick={() => { setDropdownOpen(false); onFavourite(); }}>Ưa thích</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => { setDropdownOpen(false); onLogout(); }}>Đăng xuất</button>
                </li>
              </ul>
            )}
          </div>
          <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={"btn ms-3 " + (darkMode ? "btn-info" : "btn-dark")}
            >
              {darkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
