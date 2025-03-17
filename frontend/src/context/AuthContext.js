import React, { createContext, useState, useEffect } from 'react';

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
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Token geçerliliğini kontrol etmek için API çağrısı yapılabilir
          // Şimdilik basit bir kontrol yapıyoruz
          const userData = JSON.parse(localStorage.getItem('user'));
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token geçerli değil:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Login, Logout, Register fonksiyonları
  const login = async (email, password) => {
    // Gerçek API çağrısı burada yapılacak
    // Şimdilik demo amaçlı bir token oluşturuyoruz
    const demoToken = "demo_token_123456";
    const demoUser = {
      id: 1,
      username: "demo_user",
      email: email,
      firstName: "Demo",
      lastName: "User"
    };
    
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsAuthenticated(true);
    return demoUser;
  };
  
  const logout = () => {
    localStorage.removeItem('token');
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