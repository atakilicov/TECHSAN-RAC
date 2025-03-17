import React, { useState ,useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { register } from "../api";
import "../styles/Register.css";

// Kayıt Sayfası
// - Yeni kullanıcı kaydı için form
// - Form doğrulama (validation)
// - Hata mesajlarını gösterme
// - Başarılı kayıt sonrası yönlendirme
// - "Zaten hesabım var" bağlantısı

const Register = () => {
  // State tanımlamaları
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState(""); 
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();
  
  // Form gönderme işlevi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    

    const formData = new FormData();
formData.append("first_name", firstName);
formData.append("last_name", lastName);
formData.append("phone", phone);
formData.append("username", username);
formData.append("email", email);
formData.append("password", password);
formData.append("password2", password2);
formData.append("address", address);
formData.append("birth_date", birthDate);
formData.append("city", city);

if (profilePicture) {
  formData.append("profile_picture", profilePicture); 
}

try {
  await register(formData); 
  setMessage("Kayıt başarılı! Giriş yapılıyor...");
  await login(email, password);
  navigate("/profile");
} catch (error) {
  console.error("Register error:", error);
  setMessage("Kayıt başarısız. Lütfen bilgileri kontrol edin.");
}
  };
  // JSX return
  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
      type="text"
      placeholder="Adınız"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />

      <input
          type="text"
          placeholder="Soyadınız"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

      <input
          type="tel"
          placeholder="Telefon Numarası"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />  
        
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
              <input
          type="password"
          placeholder="Şifre Tekrar"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

      <input
          type="text"
          placeholder="Adresiniz"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Doğum Tarihi"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Şehir"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
          <button type="submit">Kayıt Ol</button>
      </form>

      <div className="links">
        <Link to="/login">Zaten hesabım var</Link>
      </div>
    </div>
  );
};

export default Register; 