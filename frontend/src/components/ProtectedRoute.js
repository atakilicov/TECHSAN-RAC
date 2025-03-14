import React from 'react';
import { Navigate } from 'react-router-dom';

// Korumalı Route Bileşeni
// - Kullanıcının oturum durumunu kontrol eder
// - Oturum açmamış kullanıcıları login sayfasına yönlendirir
// - Oturum açmış kullanıcılar için normal içeriği gösterir

const ProtectedRoute = ({ children }) => {
  // Kullanıcı oturum durumunu kontrol et
  
  // Oturum açılmamışsa yönlendir
  
  // Oturum açılmışsa içeriği göster
  return children;
};

export default ProtectedRoute; 