import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../api'; // API fonksiyonlarını import et

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
  
  // Login fonksiyonu (context için basitleştirildi - sadece state güncelleme)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated,
      user,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 