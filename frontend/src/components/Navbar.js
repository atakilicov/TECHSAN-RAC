import React ,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile, logout } from "../api";
import "../styles/Navbar.css";


// Navbar Bileşeni
// - Site logosu ve başlığı
// - Navigasyon linkleri
// - Kullanıcı giriş/çıkış durumuna göre değişen UI
// - Mobil görünüm için responsive tasarım





const Navbar = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Kullanıcı bilgilerini API'den al
  useEffect(() => {
    getUserProfile()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      navigate("/login");
    });
  };
  
  
  
    return (
      <nav className="navbar">
        <Link to="/" className="logo">
          TECHSAN RAC
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile">Profil</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Çıkış Yap
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Giriş Yap</Link>
              </li>
              <li>
                <Link to="/register">Kayıt Ol</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
  );
};

export default Navbar; 