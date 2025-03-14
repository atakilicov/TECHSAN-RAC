import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Sayfa bileşenlerini içe aktar
// import Login from './pages/login';
// import Register from './pages/register';
// import Home from './pages/home';
// import Profile from './pages/profile';
// import ForgotPassword from './pages/forgotPassword';
// import ResetPassword from './pages/resetPassword';

// Navigasyon bileşeni
// Üst menü, footer vb. bileşenler buraya gelecek

// Korumalı Route bileşeni
// Yalnızca oturum açmış kullanıcıların erişebileceği sayfalar için

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigasyon bileşeni burada olacak */}
        <Routes>
          {/* Giriş sayfası */}
          <Route path="/login" element={<div>Login Sayfası</div>} />
          
          {/* Kayıt sayfası */}
          <Route path="/register" element={<div>Register Sayfası</div>} />
          
          {/* Şifremi unuttum sayfası */}
          <Route path="/forgot-password" element={<div>Şifremi Unuttum Sayfası</div>} />
          
          {/* Şifre sıfırlama sayfası */}
          <Route path="/reset-password/:token" element={<div>Şifre Sıfırlama Sayfası</div>} />
          
          {/* Profil sayfası - korumalı */}
          <Route path="/profile" element={<div>Profil Sayfası</div>} />
          
          {/* Ana sayfa */}
          <Route path="/" element={<div>Ana Sayfa</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
