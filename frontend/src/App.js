import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';

// Bileşenler
import Navbar from './components/Navbar';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Giriş sayfası */}
              <Route path="/login" element={<Login />} />
              
              {/* Kayıt sayfası */}
              <Route path="/register" element={<Register />} />
              
              {/* Şifremi unuttum sayfası */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Şifre sıfırlama sayfası */}
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* Profil sayfası */}
              <Route path="/profile" element={<Profile />} />
              
              {/* Ana sayfa */}
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
