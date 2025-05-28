import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, getProfile } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde token varsa kullanıcı bilgilerini al
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Oturum doğrulama hatası:", error);
          localStorage.removeItem('access_token');
        }
      }
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    // token değil, access_token olarak saklıyoruz
    // localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 