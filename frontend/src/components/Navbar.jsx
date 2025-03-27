import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import techsanLogo from '../assets/TECHSANLOGO.png';
// Font Awesome ikonları için import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <nav className="modern-navbar">
        <div className="nav-logo" onClick={goToHome}>
          <img src={techsanLogo} alt="TECHSAN Logo" />
          <h1>RAC by TechSan</h1>
        </div>
        <div className="nav-links">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            Anasayfa
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
                Profilim
              </Link>
              <Link to="/" onClick={handleLogout} className="logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Çıkış Yap
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
                Giriş Yap
              </Link>
              <Link to="/register" className="register-btn">
                <FontAwesomeIcon icon={faUserPlus} />
                Üye Ol
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 