import React from 'react';

const Navbar = () => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1976d2',
    color: 'white',
    boxShadow: '0 2px 8px #e3f2fd',
  }}>
    {/* Logo và tên trang web bên trái */}
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <img src="/images/logo.png" alt="Logo" style={{height: '40px', width: '40px', objectFit: 'contain', borderRadius: '8px', background: 'white', padding: '2px'}} />
      <span style={{fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '1px'}}>Student Management</span>
    </div>
    {/* Links ở giữa */}
    <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>Home</a>
      <a href="#students" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>Students</a>
      <a href="#about" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>About</a>
    </div>
    {/* Quick search bên phải */}
    <div>
      <input
        type="text"
        placeholder="Quick Search..."
        style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', fontSize: '1rem'}}
      />
    </div>
  </nav>
);

export default Navbar;
