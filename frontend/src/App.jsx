import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Bileşenler
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import ChangePassword from './pages/changePassword';
import AdminDashboard from './pages/adminDashboard';
import CreateCar from './pages/CreateCar';
import EditCar from './pages/EditCar';
import CarDetail from './pages/CarDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LazyMotion features={domAnimation}>
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
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                
                {/* Araç Yönetimi */}
                <Route path="/admin/cars/create" element={<CreateCar />} />
                <Route path="/admin/cars/edit/:id" element={<EditCar />} />
                
                {/* Ana sayfa */}
                <Route path="/" element={<Home />} />
                
                {/* CarDetail sayfası */}
                <Route path="/cars/:id" element={<CarDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </LazyMotion>
      </AuthProvider>
    </Router>
  );
}

export default App; 