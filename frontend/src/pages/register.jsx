import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { register, getCities } from "../api";
import '../styles/base.css';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cities, setCities] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Şehirleri API'den çek
    const fetchCities = async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Şehirler yüklenirken hata oluştu:", error);
        setMessage("Şehir listesi yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      }
    };

    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!termsAccepted) {
      setMessage("Kullanım koşullarını kabul etmelisiniz.");
      setLoading(false);
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      birth_date: birthDate,
      birth_country: birthCountry,
      gender: gender,
      city: city,
      address: address
    };

    try {
      const response = await register(userData);
      setRegistrationSuccess(true);
      setMessage(response.message || "Kayıt başarılı! Lütfen e-posta adresinize gönderilen bağlantı ile şifrenizi oluşturun.");
    } catch (error) {
      console.error("Register error:", error);
      
      // Backend'den gelen hata mesajlarını işleme
      if (typeof error === 'object') {
        // Nesne olarak gelen hataları işle
        let errorMessage = "";
        
        // Eğer error.city gibi alan spesifik hatalar varsa
        if (error.city) {
          errorMessage += `Şehir: ${Array.isArray(error.city) ? error.city.join(', ') : error.city}\n`;
        }
        if (error.email) {
          errorMessage += `E-posta: ${Array.isArray(error.email) ? error.email.join(', ') : error.email}\n`;
        }
        if (error.first_name) {
          errorMessage += `Ad: ${Array.isArray(error.first_name) ? error.first_name.join(', ') : error.first_name}\n`;
        }
        if (error.last_name) {
          errorMessage += `Soyad: ${Array.isArray(error.last_name) ? error.last_name.join(', ') : error.last_name}\n`;
        }
        if (error.phone) {
          errorMessage += `Telefon: ${Array.isArray(error.phone) ? error.phone.join(', ') : error.phone}\n`;
        }
        if (error.birth_date) {
          errorMessage += `Doğum tarihi: ${Array.isArray(error.birth_date) ? error.birth_date.join(', ') : error.birth_date}\n`;
        }
        if (error.birth_country) {
          errorMessage += `Doğum ülkesi: ${Array.isArray(error.birth_country) ? error.birth_country.join(', ') : error.birth_country}\n`;
        }
        if (error.gender) {
          errorMessage += `Cinsiyet: ${Array.isArray(error.gender) ? error.gender.join(', ') : error.gender}\n`;
        }
        
        // Diğer spesifik alanları ekleyebilirsiniz
        
        // Eğer non_field_errors varsa, bunları da ekleyelim
        if (error.non_field_errors) {
          errorMessage += `${Array.isArray(error.non_field_errors) ? error.non_field_errors.join(', ') : error.non_field_errors}\n`;
        }
        
        // Eğer hiçbir spesifik hata yoksa ve detail alanı varsa
        if (errorMessage === "" && error.detail) {
          errorMessage = error.detail;
        }
        
        // Eğer hiçbir hata mesajı oluşturulamamışsa, genel hata mesajı göster
        setMessage(errorMessage || "Kayıt başarısız. Lütfen bilgileri kontrol edin.");
      } else if (typeof error === 'string') {
        // String olarak gelen hataları doğrudan göster
        setMessage(error);
      } else {
        // Diğer durumlar için genel hata mesajı
        setMessage("Kayıt başarısız. Lütfen bilgileri kontrol edin.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Başarılı kayıt mesajı
  const renderSuccessMessage = () => {
    return (
      <div style={{
        backgroundColor: 'rgba(45, 133, 64, 0.1)',
        border: '1px solid rgba(45, 133, 64, 0.3)',
        padding: '2rem',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: 'rgba(45, 133, 64, 0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <span style={{ fontSize: '2rem', color: '#2d8540' }}>✓</span>
        </div>
        
        <h3 style={{ color: '#2d8540', marginBottom: '1rem' }}>Kayıt Başarılı!</h3>
        
        <p style={{ 
          marginBottom: '1.5rem',
          color: '#fff',
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          {message || "Lütfen e-posta adresinize gönderilen bağlantıya tıklayarak şifrenizi oluşturun."}
        </p>
        
        <Link to="/login" style={{
          display: 'inline-block',
          backgroundColor: '#2d8540',
          color: '#fff',
          padding: '0.8rem 1.5rem',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          Giriş Sayfasına Dön
        </Link>
      </div>
    );
  };

  // Kayıt Formu
  const renderRegisterForm = () => {
    return (
      <>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          textAlign: 'center',
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#6D213C', /* Açık bordo tonu */
          letterSpacing: '0.5px'
        }}>HESAP OLUŞTUR</h2>
        
        {message && !registrationSuccess && (
          <div className="alert" style={{
            backgroundColor: 'rgba(202, 43, 43, 0.2)',
            color: '#ff8a8a',
            border: '1px solid rgba(202, 43, 43, 0.3)',
            padding: '0.8rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            marginBottom: '1.2rem',
            fontWeight: '500',
            whiteSpace: 'pre-line'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Ad Soyad alanları */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '0.8rem' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Ad*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Soyad*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                }}
              />
            </div>
          </div>

          {/* Email alanı */}
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type="email"
              placeholder="E-posta*"
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
              }}
            />
          </div>

          {/* Telefon alanı */}
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type="tel"
              placeholder="Telefon*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              }}
            />
          </div>

          {/* Doğum Tarihi alanı */}
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type="date"
              placeholder="Doğum Tarihi*"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
              }}
            />
          </div>

          {/* Doğum Ülkesi alanı */}
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type="text"
              placeholder="Doğum Ülkesi*"
              value={birthCountry}
              onChange={(e) => setBirthCountry(e.target.value)}
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
              }}
            />
          </div>

          {/* Cinsiyet seçimi */}
          <div style={{ marginBottom: '0.8rem' }}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
                appearance: 'none'
              }}
            >
              <option value="" disabled selected>Cinsiyet Seçin*</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          {/* Şehir seçimi */}
          <div style={{ marginBottom: '0.8rem' }}>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
                appearance: 'none'
              }}
            >
              <option value="" disabled selected>Şehir Seçin*</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>{city.label}</option>
              ))}
            </select>
          </div>

          {/* Adres alanı */}
          <div style={{ marginBottom: '1rem' }}>
            <textarea
              placeholder="Adres (İsteğe bağlı)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                minHeight: '80px',
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: '1rem',
                color: '#fff',
                resize: 'vertical'
              }}
            />
          </div>
          
          {/* Kullanım koşulları onayı */}
          <div style={{ 
            marginBottom: '1.5rem', 
            display: 'flex', 
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{
                marginTop: '5px'
              }}
            />
            <label htmlFor="terms" style={{ 
              fontSize: '0.9rem',
              color: '#fff',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>
              Kişisel verilerimin işlenmesine ilişkin <a href="#" style={{ color: '#9A3158', textDecoration: 'none' }}>Aydınlatma Metni</a>'ni okudum, anladım ve kabul ediyorum.*
            </label>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
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
            {loading ? "KAYIT YAPILIYOR..." : "HESAP OLUŞTUR"}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.2rem', 
          textAlign: 'center',
          fontSize: '0.95rem',
          color: '#fff'
        }}>
          <p>
            Zaten bir hesabınız var mı? <Link to="/login" style={{ color: '#9A3158', fontWeight: '600', textDecoration: 'none' }}>Giriş Yap</Link>
          </p>
        </div>
      </>
    );
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
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '"Poppins", "Segoe UI", Roboto, sans-serif'
    }}>
      <div className="auth-card" style={{
        backgroundColor: 'rgba(10, 10, 10, 0.3)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderTop: 'none',
        borderRadius: '10px',
        maxWidth: '420px',
        padding: '35px 30px',
        width: '100%',
        transition: 'all 0.3s ease'
      }}>
        {registrationSuccess ? renderSuccessMessage() : renderRegisterForm()}
      </div>
    </div>
  );
};

export default Register;

// 🎨 Styles

const containerStyle = {
  backgroundImage: 'url("/images/Rolssroyce.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: '5%',
  zIndex: 9999,
};

const formWrapperStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  maxWidth: '500px',
};

const formStyle = {
  background: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  padding: '40px 30px',
  width: '100%',
  color: '#fff',
};

const titleStyle = {
  marginBottom: '20px',
  fontSize: '1.8rem',
  fontWeight: '700',
  color: '#d4af37', // Gold color
  textAlign: 'center',
};

const messageStyle = {
  padding: '10px',
  borderRadius: '10px',
  fontSize: '0.85rem',
  marginBottom: '20px',
};

const formGridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const twoColStyle = {
  display: 'flex',
  gap: '10px',
};

const inputStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '10px',
  padding: '12px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  transition: 'all 0.3s ease',
};

const checkboxContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const checkboxStyle = {
  width: '16px',
  height: '16px',
};

const buttonStyle = {
  padding: '12px',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: '600',
  transition: 'all 0.3s ease',
};

