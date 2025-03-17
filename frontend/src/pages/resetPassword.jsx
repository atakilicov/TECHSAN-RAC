import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resetPasswordConfirm } from "../api";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage("Şifreler uyuşmuyor.");
      setLoading(false);
      return;
    }

    try {
      await resetPasswordConfirm(token, newPassword);
      setMessage("Şifre başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Şifre sıfırlama başarısız. Token süresi dolmuş olabilir.");
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  
  return (
    <div className="course-register-container">
      <div className="course-register-left">
        <div className="gradient-overlay"></div>
        <div className="register-info">
          <div className="graduation-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.65 10C11.83 7.67 9.61 6 7 6C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18C9.61 18 11.83 16.33 12.65 14H17V18H21V14H23V10H12.65ZM7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14Z" fill="#FFFFFF"/>
            </svg>
          </div>
          <h2>YENİ ŞİFRE OLUŞTURUN</h2>
          <p>Yeni şifrenizi oluşturun ve hesabınıza güvenli bir şekilde giriş yapın. Şifrenizin en az 8 karakter uzunluğunda olması ve büyük harf, küçük harf ve rakam içermesi önerilir.</p>
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
              <path d="M12.63 2C18.16 2 22.64 6.5 22.64 12C22.64 17.5 18.16 22 12.63 22C9.16 22 6.15 20.18 4.3 17.43L5.8 16.35C7.32 18.68 9.84 20 12.63 20C17.05 20 20.64 16.42 20.64 12C20.64 7.58 17.05 4 12.63 4L8.63 4L11.63 7L10.23 8.41L4.83 3L10.23 -2.41L11.63 -1L8.63 2L12.63 2Z" fill="#7D5A3C"/>
            </svg>
          </div>
          <h3>ŞİFRE SIFIRLA</h3>

          {message && 
            <div className={message.includes("başarıyla") ? "register-alert-success" : "register-alert-error"}>
              {message}
            </div>
          }

          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Yeni Şifre"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle" 
                tabIndex="-1"
                onClick={() => togglePasswordVisibility('password')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {showPassword ? (
                    <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5Z" fill="#7D5A3C"/>
                  ) : (
                    <path d="M12 6C8.68629 6 5.73207 7.92714 4.08276 11.0635C3.9687 11.327 3.9687 11.673 4.08276 11.9365C5.73207 15.0729 8.68629 17 12 17C15.3137 17 18.2679 15.0729 19.9172 11.9365C20.0313 11.673 20.0313 11.327 19.9172 11.0635C18.2679 7.92714 15.3137 6 12 6ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM2.54588 9.93398L3.5 10.4986V10.5L2.54588 9.93398ZM2.54588 14.066L3.49988 13.5014L3.5 13.5L2.54588 14.066Z" fill="#7D5A3C"/>
                  )}
                </svg>
              </button>
            </div>
            
            <div className="register-form-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Şifreyi Tekrar Gir"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle" 
                tabIndex="-1"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {showConfirmPassword ? (
                    <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5Z" fill="#7D5A3C"/>
                  ) : (
                    <path d="M12 6C8.68629 6 5.73207 7.92714 4.08276 11.0635C3.9687 11.327 3.9687 11.673 4.08276 11.9365C5.73207 15.0729 8.68629 17 12 17C15.3137 17 18.2679 15.0729 19.9172 11.9365C20.0313 11.673 20.0313 11.327 19.9172 11.0635C18.2679 7.92714 15.3137 6 12 6ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM2.54588 9.93398L3.5 10.4986V10.5L2.54588 9.93398ZM2.54588 14.066L3.49988 13.5014L3.5 13.5L2.54588 14.066Z" fill="#7D5A3C"/>
                  )}
                </svg>
              </button>
            </div>
            
            <button 
              type="submit" 
              className="register-btn-submit"
              disabled={loading}
            >
              {loading ? "İŞLEM YAPILIYOR..." : "ŞİFREYİ GÜNCELLE"}
            </button>
          </form>
          
          <div className="register-auth-links">
            <Link to="/login">Giriş sayfasına dön</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 