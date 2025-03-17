import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import techsanLogo from '../assets/TECHSANLOGO.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="modern-navbar">
        <div className="nav-logo">
          <img src={techsanLogo} alt="TECHSAN Logo" />
          <h1>RAC by TechSan</h1>
        </div>
        <div className="nav-links">
          <Link to="/">Anasayfa</Link>
          {user ? (
            <>
              <Link to="/profile">Profilim</Link>
              <Link to="/" onClick={handleLogout} className="logout-btn">Çıkış Yap</Link>
            </>
          ) : (
            <>
              <Link to="/login">Giriş Yap</Link>
              <Link to="/register" className="register-btn">Üye Ol</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 