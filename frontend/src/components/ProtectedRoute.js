import React,{useState,useEffect}from 'react';
import { Navigate } from 'react-router-dom';
import { getUser, getUserProfile } from "../api";

// Korumalı Route Bileşeni
// - Kullanıcının oturum durumunu kontrol eder
// - Oturum açmamış kullanıcıları login sayfasına yönlendirir
// - Oturum açmış kullanıcılar için normal içeriği gösterir

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="loading">Yükleniyor...</div>; // Sayfa yüklenirken gösterilecek içerik
  }

  return user ? children : <Navigate to="/login" />;
  // Kullanıcı oturum durumunu kontrol et
  
  // Oturum açılmamışsa yönlendir
  
  // Oturum açılmışsa içeriği göster
  
};

export default ProtectedRoute; 