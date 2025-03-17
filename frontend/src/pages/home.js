import React from 'react';
import { Link } from 'react-router-dom';

// Ana Sayfa
// - Mevcut araçları listele
// - Araç arama ve filtreleme özellikleri
// - Araç detaylarını görüntüleme
// - Kiralama talebi oluşturma

const Home = () => {
  return (
    <div className="home-container">
      <h1>TECHSAN-RAC'e Hoş Geldiniz</h1>
      
      <div className="features">
        <div className="feature-card">
          <h3>Hızlı ve Güvenli</h3>
          <p>En son teknoloji ile güvenli ve hızlı bir deneyim sunuyoruz.</p>
        </div>

        <div className="feature-card">
          <h3>7/24 Destek</h3>
          <p>Teknik ekibimiz her zaman yanınızda.</p>
        </div>

        <div className="feature-card">
          <h3>Kolay Kullanım</h3>
          <p>Kullanıcı dostu arayüz ile işlemlerinizi kolayca yapın.</p>
        </div>
      </div>

      <div className="cta-buttons">
        <Link to="/register" className="btn">Hemen Başla</Link>
        <Link to="/login" className="btn btn-outline">Giriş Yap</Link>
      </div>
    </div>
  );
};

export default Home;
  