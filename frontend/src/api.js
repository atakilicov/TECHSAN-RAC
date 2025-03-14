import axios from 'axios';

// API'nin temel URL'i
const API_URL = 'http://localhost:8000/api';

// Axios instance oluşturma
// Token'ı otomatik olarak ekleyecek ve hata işleme mekanizması içerecek

// Authentication İstekleri
// - Login
// - Register
// - Logout
// - Get User Profile
// - Update User Profile
// - Change Password

// Araç İstekleri
// - Araçları Listele
// - Araç Detayları Getir
// - Araç Ara/Filtrele

// Kiralama İstekleri
// - Kiralama Oluştur
// - Kiralamaları Listele
// - Kiralama Detayı Getir
// - Kiralama Durumu Güncelle

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Django backend URL'in (canlıya alınca değişir)
  timeout: 5000, // istek süresi
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
