import React, { createContext, useState, useEffect } from 'react';
import { login, register, getUser, logout, getUserProfile } from "../api";



// Authentication Context
// - Kullanıcı kimlik doğrulama durumunu global olarak yönetir
// - Login, Logout, Register fonksiyonlarını içerir
// - Token'ları local storage'da saklar
// - Kullanıcı bilgilerini tutar

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State tanımlamaları

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);
  
  // Sayfa yüklendiğinde token kontrolü
  
  // Login, Logout, Register fonksiyonları

  // Kullanıcı giriş fonksiyonu


  const loginUser = async (email, password ,navigate) => {
    try {
      const data = await login(email, password);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      window.location.href = "/profile"; 
    } catch (error) {
      console.error("Giriş başarısız:", error);
      throw error;
    }
  };

  // Kullanıcı kayıt olma fonksiyonu
  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Kayıt başarısız:", error);
    }
  };

  // Çıkış yapma fonksiyonu
  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Çıkış başarısız:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, loginUser, registerUser, logoutUser, loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 