import React from 'react';
import './Footer.css'; // Footer için stil dosyası

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} TECHSAN Rent A Car. Tüm hakları saklıdır.</p>
        <div className="footer-links">
          <a href="/about">Hakkımızda</a>
          <a href="/contact">İletişim</a>
          <a href="/privacy">Gizlilik Politikası</a>
          <a href="/terms">Kullanım Şartları</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 