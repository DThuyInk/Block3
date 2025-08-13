import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        background: '#f7f7f0',
        borderTop: '1px solid #eee',
        padding: '24px 0 16px 0',
        marginTop: '48px',
        fontSize: '1.05rem'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#234e3c'
        }}
      >
        <span>
          Made with <span style={{ fontSize: '1.2em' }}>❤️</span> and <span style={{ fontSize: '1.2em' }}>🥑</span>
        </span>
        <span style={{ display: 'flex', gap: '18px' }}>
          <a href="#" style={{ color: '#234e3c', fontSize: '1.5em' }} title="Instagram">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" style={{ color: '#234e3c', fontSize: '1.5em' }} title="Butterfly">
            {/* Butterfly emoji */}
            <span role="img" aria-label="butterfly">🦋</span>
          </a>
          <a href="#" style={{ color: '#234e3c', fontSize: '1.5em' }} title="TikTok">
            <i className="bi bi-tiktok"></i>
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;