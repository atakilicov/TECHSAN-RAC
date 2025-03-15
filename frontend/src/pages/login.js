import React, { useState ,useContext} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";


// Login Sayfası
// - Kullanıcı adı ve şifre girişi için form
// - Form doğrulama (validation)
// - Hata mesajlarını gösterme
// - Başarılı giriş sonrası yönlendirme
// - "Şifremi Unuttum" bağlantısı
// - "Hesap Oluştur" bağlantısı

const Login = () => {
  // State tanımlamaları
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  
  
  // Form gönderme işlevi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password,navigate);
      navigate("/profile"); 
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };
  
  // JSX return
  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>

      <div className="links">
        <Link to="/forgot-password">Şifremi Unuttum</Link>
        <Link to="/register">Hesap Oluştur</Link>
      </div>
    </div>
  );
};

export default Login;
