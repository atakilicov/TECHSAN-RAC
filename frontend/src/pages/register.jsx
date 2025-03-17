import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { register, getCities } from "../api";
import '../styles/base.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cities, setCities] = useState([]);

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

    if (password !== password2) {
      setMessage("Şifreler eşleşmiyor!");
      setLoading(false);
      return;
    }

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
      password: password,
      password2: password2,
      birth_date: birthDate,
      city: city
    };

    try {
      await register(userData);
      setMessage("Kayıt başarılı! Giriş yapılıyor...");
      await login(email, password);
      navigate("/profile");
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
        if (error.password) {
          errorMessage += `Şifre: ${Array.isArray(error.password) ? error.password.join(', ') : error.password}\n`;
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

  return (
    <div className="auth-container" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/images/Rolssroyce.jpg")',
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: '5%',
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
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          textAlign: 'center',
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#E67E22', // Turuncu tonu
          letterSpacing: '0.5px'
        }}>HESAP OLUŞTUR</h2>
        
        {message && (
          <div className="alert" style={{
            backgroundColor: message.includes("başarılı") ? 'rgba(45, 133, 64, 0.2)' : 'rgba(202, 43, 43, 0.2)',
            color: message.includes("başarılı") ? '#7aff9e' : '#ff8a8a',
            border: `1px solid ${message.includes("başarılı") ? 'rgba(45, 133, 64, 0.3)' : 'rgba(202, 43, 43, 0.3)'}`,
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
          <div style={{ 
            display: 'flex',
            gap: '10px',
            marginBottom: '1rem'
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Adınız"
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
                  fontWeight: '400',
                  letterSpacing: '0.3px',
                  caretColor: '#fff',
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Soyadınız"
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
                  fontWeight: '400',
                  letterSpacing: '0.3px',
                  caretColor: '#fff',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
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
                caretColor: '#fff',
              }}
            />
          </div>

          <div style={{ 
            display: 'flex',
            gap: '10px',
            marginBottom: '1rem'
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="tel"
                placeholder="Telefon Numarası"
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
                  fontWeight: '400',
                  letterSpacing: '0.3px',
                  caretColor: '#fff',
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <input
                type="date"
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
                  fontWeight: '400',
                  letterSpacing: '0.3px',
                  caretColor: '#fff'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
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
                color: city ? '#fff' : '#fff',
                fontWeight: '400',
                appearance: 'none',
                letterSpacing: '0.3px'
              }}
            >
              <option value="" style={{backgroundColor: '#222', color: '#fff'}}>Şehir Seçiniz</option>
              {cities.map((cityItem) => (
                <option 
                  key={cityItem.value} 
                  value={cityItem.value} 
                  style={{backgroundColor: '#222', color: '#fff'}}
                >
                  {cityItem.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ 
            display: 'flex',
            gap: '10px',
            marginBottom: '1rem'
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  caretColor: '#fff',
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <input
                type="password"
                placeholder="Şifre tekrarı"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
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
                  caretColor: '#fff',
                }}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1.2rem' 
          }}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              id="terms"
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="terms" style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '400' }}>
              Kullanım koşullarını kabul ediyorum
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading || !termsAccepted}
            style={{
              backgroundColor: loading || !termsAccepted ? 'rgba(230, 126, 34, 0.6)' : '#E67E22', // Turuncu ton
              color: '#fff',
              height: '48px',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              width: '100%',
              border: 'none',
              borderRadius: '10px',
              cursor: loading || !termsAccepted ? 'not-allowed' : 'pointer',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 10px rgba(230, 126, 34, 0.3)' // Turuncu ton
            }}
          >
            {loading ? "İŞLEM YAPILIYOR..." : "KAYIT OL"}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.4rem', 
          textAlign: 'center', 
          fontSize: '0.95rem',
          color: '#fff'
        }}>
          <p>Zaten hesabınız var mı? <Link to="/login" style={{ color: '#F39C12', fontWeight: '600', textDecoration: 'none' }}>Giriş Yap</Link></p>
        </div>
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

