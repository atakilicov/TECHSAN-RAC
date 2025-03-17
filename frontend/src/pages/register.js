import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { register } from "../api";

// Kayıt Sayfası - Modern, Minimal ve Yuvarlak Köşeli Tasarım
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
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
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
      setMessage("Kayıt başarısız. Lütfen bilgileri kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
    "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
    "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
    "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
    "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ];

  return (
    <div className="modern-auth-container">
      <div className="modern-auth-card">
        <h2>HESAP OLUŞTUR</h2>
        
        {message && (
          <div className={message.includes("başarılı") ? "modern-alert-success" : "modern-alert-error"}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modern-auth-form">
          <div className="modern-form-row">
            <div className="modern-form-group">
              <input
                type="text"
                placeholder="Adınız"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="modern-form-group">
              <input
                type="text"
                placeholder="Soyadınız"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modern-form-group">
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="modern-form-row">
            <div className="modern-form-group">
              <input
                type="tel"
                placeholder="Telefon Numarası"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="modern-form-group">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modern-form-group">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Şehir Seçiniz</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="modern-form-row">
            <div className="modern-form-group">
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="modern-form-group">
              <input
                type="password"
                placeholder="Şifre tekrarı"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modern-form-check">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              id="terms"
            />
            <label htmlFor="terms">Kullanım koşullarını kabul ediyorum</label>
          </div>

          <button 
            type="submit" 
            className="modern-btn-primary" 
            disabled={loading || !termsAccepted}
          >
            {loading ? "İŞLEM YAPILIYOR..." : "KAYIT OL"}
          </button>
        </form>

        <div className="modern-auth-links">
          <p>Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;