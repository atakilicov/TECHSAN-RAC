import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

// Login Sayfası - Modern ve Şık Tasarım
// - Kahverengi-altın teması
// - Logo ve şık form tasarımı
// - Form doğrulama (validation)
// - Hata mesajlarını gösterme
// - Başarılı giriş sonrası yönlendirme
// - "Şifremi Unuttum" bağlantısı
// - "Hesap Oluştur" bağlantısı

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Giriş başarısız. E-posta veya şifre yanlış.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-auth-container">
      <div className="modern-auth-card">
        <h2>GİRİŞ YAP</h2>

        {message && (
          <div className="modern-alert-error">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="modern-form-group">
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="modern-form-group">
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="modern-btn-primary" 
            disabled={loading}
          >
            {loading ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
          </button>
        </form>

        <div className="modern-auth-links">
          <p><Link to="/forgot-password">Şifremi Unuttum</Link></p>
          <p>Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;