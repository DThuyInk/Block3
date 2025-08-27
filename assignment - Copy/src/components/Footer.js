import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-info">
        <strong>Thông tin:</strong> Dự án Figure Shop - FER202
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Figure Shop. All rights reserved.
      </div>
      <div className="footer-contact">
        Liên hệ: <a href="https://github.com/DThuyInk/Block3" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  </footer>
);

export default Footer;
