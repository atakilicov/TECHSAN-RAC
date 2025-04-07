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
import ChangePassword from './pages/changePassword';
import AdminDashboard from './pages/adminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
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
              
              {/* Şifre sıfırlama sayfası - URL parametrelerini düzenleme */}
              <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
              
              {/* Şifre oluşturma sayfası - Kayıt sonrası */}
              <Route path="/create-password/:uid/:token" element={<ResetPassword />} />
              
              {/* Şifre değiştirme sayfası */}
              <Route path="/change-password" element={<ChangePassword />} />
              
              {/* Profil sayfası */}
              <Route path="/profile" element={<Profile />} />
              
              {/* Admin Dashboard */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Ana sayfa */}
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 