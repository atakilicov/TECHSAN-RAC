import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api'; // API fonksiyonlarını import et
import { useNavigate } from 'react-router-dom';

// Authentication Context
// - Kullanıcı kimlik doğrulama durumunu global olarak yönetir
// - Login, Logout, Register fonksiyonlarını içerir
// - Token'ları local storage'da saklar
// - Kullanıcı bilgilerini tutar

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State tanımlamaları
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Sayfa yüklendiğinde token kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Token geçerliliğini kontrol etmek için API çağrısı yapılabilir
          // Şimdilik basit bir kontrol yapıyoruz
          const userData = JSON.parse(localStorage.getItem('user'));
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token geçerli değil:", error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // User state'ini güncelleyen özel fonksiyon
  const updateUser = (userData) => {
    console.log("Kullanıcı verisi güncelleniyor:", userData);
    // State'i güncelle
    setUser(userData);
    
    // LocalStorage'ı da güncelle
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };
  
  // Login fonksiyonu (context için basitleştirildi - sadece state güncelleme)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  // Logout fonksiyonu - API çağrısı yapar ve kullanıcıyı çıkış sayfasına yönlendirir
  const logout = async () => {
    try {
      // API çağrısı
      await apiLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // State ve localStorage temizleme
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      
      // Login sayfasına yönlendirme
      navigate('/login');
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated,
      user,
      loading,
      login,
      logout,
      setUser: updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 