import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
    } catch (err) {
      setError("Geçersiz e-posta adresi veya hata oluştu.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="course-register-container">
      <div className="course-register-left">
        <div className="gradient-overlay"></div>
        <div className="register-info">
          <div className="graduation-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#FFFFFF"/>
            </svg>
          </div>
          <h2>ŞİFRENİZİ Mİ UNUTTUNUZ?</h2>
          <p>Endişelenmeyin! E-posta adresinizi girin ve şifre sıfırlama bağlantısını hemen göndereceğiz.</p>
          <div className="register-buttons">
            <button className="register-btn-outline">Yardım Al</button>
            <button className="register-btn-primary">Giriş Sayfasına Dön</button>
          </div>
        </div>
      </div>
      
      <div className="course-register-right">
        <div className="register-form">
          <div className="register-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="#7D5A3C"/>
            </svg>
          </div>
          <h3>ŞİFREMİ UNUTTUM</h3>
          
          {message && <div className="register-alert-success">{message}</div>}
          {error && <div className="register-alert-error">{error}</div>}
          
          <p className="register-form-description">
            Lütfen hesabınızla ilişkili e-posta adresinizi girin, şifre sıfırlama bağlantısını göndereceğiz.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="register-btn-submit"
              disabled={loading}
            >
              {loading ? "GÖNDERİLİYOR..." : "RESET LİNKİ GÖNDER"}
            </button>
          </form>

          <div className="register-auth-links">
            <p>
              <Link to="/login">Giriş sayfasına dön</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 