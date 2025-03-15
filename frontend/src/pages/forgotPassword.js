import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from "../api";
import "../styles/ForgotPassword.css";

// Şifremi Unuttum Sayfası
// - E-posta adresi için form
// - Form doğrulama (validation)
// - Şifre sıfırlama talebi gönderme
// - Hata mesajlarını gösterme
// - Başarılı talep sonrası bilgi mesajı

const ForgotPassword = () => {
  // State tanımlamaları
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Form gönderme işlevi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await resetPassword(email);
      setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
    } catch (err) {
      setError("Geçersiz e-posta adresi veya hata oluştu.");
    }
  };
  
  // JSX return
  return (
    <div className="forgot-password-container">
      <h2>Şifremi Unuttum</h2>
      <p>Lütfen e-posta adresinizi girin, şifre sıfırlama bağlantısını göndereceğiz.</p>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gönder</button>
      </form>

      <Link to="/login">Giriş sayfasına dön</Link>
    </div>
  );
};

export default ForgotPassword; 