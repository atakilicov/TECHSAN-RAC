import axios from 'axios';

// API'nin temel URL'i
const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_URL, 
  timeout: 5000, // istek süresi
  headers: {
    'Content-Type': 'application/json',
  }
});
// Token'ı otomatik olarak ekleyecek ve hata işleme mekanizması içerecek

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
}



// Authentication İstekleri
// - Login
export const login = async (email, password) => {
  try {
    const response = await api.post("/login/", { email, password });

    // Token'ı localStorage'a kaydet ve header'a ekle
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// - Register
export const register = async (userData) => {
  try {
    const response = await api.post("register/", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


// - Logout
export const logout = async () => {
  try {
    await api.post("/logout/");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  } catch (error) {
    throw error;
  }
};
// - Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - Update User Profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/user/update/", profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - Change Password
export const changePassword = async (newPassword) => {
  try {
    const response = await api.post("/password-change/", { password: newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password/", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Şifre sıfırlama işlemini tamamla
export const resetPasswordConfirm = async (token, newPassword) => {
  try {
    const response = await api.post(`/password-reset-confirm/${token}/`, { password: newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Araç İstekleri
// - Araçları Listele
export const getCars = async () => {
  try {
    const response = await api.get("/cars/"); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

// - Araç Detayları Getir
// - Araç Ara/Filtrele

// Kiralama İstekleri
// - Kiralama Oluştur
// - Kiralamaları Listele
// - Kiralama Detayı Getir
// - Kiralama Durumu Güncelle



export default api;
