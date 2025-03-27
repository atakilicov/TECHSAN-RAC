import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resetPasswordConfirm } from "../api";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    
    setLoading(true);

    try {
      const response = await resetPasswordConfirm(uid, token, newPassword, confirmPassword);
      setMessage(response.message || "Şifreniz başarıyla güncellenmiştir.");
      
      // Kullanıcıyı giriş sayfasına yönlendir
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.error || "Şifre sıfırlama işlemi başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/images/Rollsroyce.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 5%'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.75rem',
          fontWeight: '600'
        }}>
          Yeni Şifre Oluştur
        </h2>

        <p style={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '1.2rem',
          fontSize: '0.95rem'
        }}>
          Lütfen yeni şifrenizi girin ve onaylayın.
        </p>

        {message && (
          <div style={{
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            color: '#4CAF50',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            color: '#F44336',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.2rem', position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Yeni Şifre"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: '48px',
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: '1rem',
                color: '#fff',
                fontWeight: '400',
                letterSpacing: '0.3px',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.2rem', position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifreyi Tekrar Girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: '48px',
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: '1rem',
                color: '#fff',
                fontWeight: '400',
                letterSpacing: '0.3px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
            style={{
              background: loading ? 'rgba(48, 10, 16, 0.6)' : 'linear-gradient(135deg, #6D213C, #300A10)',
              color: '#fff',
              height: '48px',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              width: '100%',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 10px rgba(48, 10, 16, 0.3)'
            }}
          >
            {loading ? "İŞLENİYOR..." : "YENİ ŞİFREMİ KAYDET"}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.4rem', 
          textAlign: 'center', 
          fontSize: '0.95rem',
          color: '#fff'
        }}>
          <p>
            <Link to="/login" style={{ color: '#9A3158', fontWeight: '500', textDecoration: 'none' }}>Giriş Sayfası</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 