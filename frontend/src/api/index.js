import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - her istekte token ekler
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Kullanıcı profili güncelleme
export const updateUserProfile = async (userData) => {
  try {
    console.log("API isteği gönderildi:", API_URL + '/users/profile', userData);
    const response = await api.put('/users/profile', userData);
    console.log("API yanıtı alındı:", response.data);
    return response.data;
  } catch (error) {
    console.error("API hatası:", error);
    if (error.response) {
      console.error("Hata yanıtı:", error.response.data);
      console.error("Hata durumu:", error.response.status);
    }
    throw error.response?.data || { error: 'Profil güncellenemedi: ' + error.message };
  }
};

// ... diğer API fonksiyonları 

// Diğer export'lar
export {
  login,
  register,
  logout,
  forgotPassword,
  resetPasswordConfirm,
  changePassword,
  getCities,
  getCurrentUser,
  isAuthenticated,
  testBackendConnection,
  updateUserProfile
}; 