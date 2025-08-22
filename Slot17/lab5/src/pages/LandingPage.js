import React from "react";

const LandingPage = ({ onLogin, onRegister }) => (
  <div style={{ minHeight: '100vh', background: '#f5f5f5', color: '#222' }}>
    <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(90deg, #fffbe6 0%, #ffe0b2 100%)', boxShadow: '0 2px 8px rgba(183,28,28,0.08)' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2" style={{ background: 'none' }}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%', boxShadow: '0 2px 8px rgba(183,28,28,0.12)' }} />
          <span style={{ background: 'none', color: '#b71c1c', fontFamily: 'serif', fontSize: '2.5rem', letterSpacing: '2px' }}>Food Order App</span>
        </span>
        <div className="d-flex gap-2" style={{ background: 'none' }}>
          <button className="btn btn-primary" onClick={onLogin}>Đăng nhập</button>
          <button className="btn btn-success" onClick={onRegister}>Đăng ký</button>
        </div>
      </div>
    </nav>
    <div className="container py-5 text-center">
      <h1 className="mb-4">Chào mừng đến với Food Order App!</h1>
      <p className="lead mb-5">Đặt món ăn nhanh chóng, tiện lợi và an toàn.</p>
  <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" style={{ width: 120, borderRadius: '50%', boxShadow: '0 2px 8px rgba(183,28,28,0.12)' }} />
    </div>
  </div>
);

export default LandingPage;
