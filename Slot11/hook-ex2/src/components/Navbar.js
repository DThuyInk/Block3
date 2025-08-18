import React from 'react';

const Navbar = () => (
  <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#1976d2', color: 'white'}}>
    <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>Home</a>
      <a href="#students" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>Students</a>
      <a href="#about" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>About</a>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <span style={{fontWeight: 'bold'}}>Student Management</span>
      <input
        type="text"
        placeholder="Quick Search..."
        style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', fontSize: '1rem'}}
      />
    </div>
  </nav>
);

export default Navbar;
