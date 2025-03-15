import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordConfirm } from "../api";
import "../styles/ResetPassword.css";

// Şifre Sıfırlama Sayfası
// - Yeni şifre ve şifre doğrulama için form
// - Form doğrulama (validation)
// - Token doğrulama
// - Hata mesajlarını gösterme
// - Başarılı sıfırlama sonrası yönlendirme

const ResetPassword = () => {
  // URL parametrelerini alma
  // State tanımlamaları
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  
  // Form gönderme işlevi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Şifreler uyuşmuyor.");
      return;
    }

    try {
      await resetPasswordConfirm(token, newPassword);
      setMessage("Şifre başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/login"), 2000); // 2 saniye sonra giriş sayfasına yönlendir
    } catch (error) {
      setMessage("Şifre sıfırlama başarısız. Token süresi dolmuş olabilir.");
    }
  };
  
  // JSX return
  return (
    <div className="reset-password-container">
    <h2>Şifre Sıfırla</h2>

    {message && <p className="message">{message}</p>}

    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Yeni Şifre"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifreyi Tekrar Gir"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Şifreyi Güncelle</button>
    </form>
  </div>
);
  
};

export default ResetPassword; 