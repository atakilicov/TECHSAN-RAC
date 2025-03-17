import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/TECHSANLOGO.png';

// Navbar Bileşeni
// - Site logosu ve başlığı
// - Navigasyon linkleri
// - Kullanıcı giriş/çıkış durumuna göre değişen UI
// - Mobil görünüm için responsive tasarım

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Sayfa kaydırma durumunu izle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Link aktif olup olmadığını kontrol et
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <Link to="/">
          <img src={logo} alt="TECHSAN Logo" />
          <span>TECHSAN RENT A CAR</span>
        </Link>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          Ana Sayfa
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
              Profilim
            </Link>
            <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>
              Derslerim
            </Link>
            <button 
              onClick={handleLogout} 
              className="logout-btn"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>
              Giriş Yap
            </Link>
            <Link to="/register" className={isActive('/register') ? 'active' : ''}>
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 