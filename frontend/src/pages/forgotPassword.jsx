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
      <div className="auth-card" style={{
        backgroundColor: 'rgba(10, 10, 10, 0.3)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderTop: 'none',
        borderRadius: '10px',
        maxWidth: '360px',
        padding: '35px 30px',
        width: '100%',
        transition: 'all 0.3s ease'
      }}>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          textAlign: 'center',
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#6D213C',
          letterSpacing: '0.5px'
        }}>Şifremi Unuttum</h2>
        
        <p style={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '1.2rem',
          fontSize: '0.95rem'
        }}>
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı göndereceğiz.
        </p>
        
        {message && <div className="alert" style={{
          backgroundColor: 'rgba(202, 43, 43, 0.2)',
          color: '#ff8a8a',
          border: '1px solid rgba(202, 43, 43, 0.3)',
          padding: '0.8rem',
          borderRadius: '10px',
          fontSize: '0.9rem',
          marginBottom: '1.2rem',
          fontWeight: '500'
        }}>{message}</div>}
        
        {error && <div className="alert" style={{
          backgroundColor: 'rgba(202, 43, 43, 0.2)',
          color: '#ff8a8a',
          border: '1px solid rgba(202, 43, 43, 0.3)',
          padding: '0.8rem',
          borderRadius: '10px',
          fontSize: '0.9rem',
          marginBottom: '1.2rem',
          fontWeight: '500'
        }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "GÖNDERİLİYOR..." : "ŞIFRE SIFIRLAMA BAĞLANTISI GÖNDER"}
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

export default ForgotPassword; 