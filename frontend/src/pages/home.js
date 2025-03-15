import React, { useState, useEffect } from 'react';
import { getCars } from "../api";
import "../styles/Home.css"; 

// Ana Sayfa
// - Mevcut araçları listele
// - Araç arama ve filtreleme özellikleri
// - Araç detaylarını görüntüleme
// - Kiralama talebi oluşturma

const Home = () => {
  // State tanımlamaları
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // API'den araçları yükleme
  useEffect(() => {
    getCars()
      .then((data) => setCars(data))
      .catch((error) => console.error("Araçlar yüklenirken hata oluştu:", error));
  }, []);
  
  // Arama ve filtreleme işlevleri
  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // JSX return
  
    return (
      <div className="home-container">
        <h1>Kiralık Araçlar</h1>
        
        <input
          type="text"
          placeholder="Araç ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
  
        <div className="car-list">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <h2>{car.brand} {car.model}</h2>
                <p>Yıl: {car.year}</p>
                <p>Fiyat: {car.price}₺ / Gün</p>
                <button className="rent-button">Kirala</button>
              </div>
            ))
          ) : (
            <p>Araç bulunamadı.</p>
          )}
        </div>
      </div>
  
  );
};

export default Home;
  