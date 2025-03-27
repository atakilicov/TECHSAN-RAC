import axios from 'axios';

// API'nin temel URL'i - Backend sunucusunun adresi
// Bu URL, Django backend'in çalıştığı adresi gösterir
// Canlı ortama geçildiğinde bu adres değiştirilmelidir
const API_URL = 'http://127.0.0.1:8000/api/';

// Axios instance oluşturma
// Axios, HTTP istekleri yapmak için kullanılan bir JavaScript kütüphanesidir
// Bu instance, tüm API isteklerinde kullanılacak temel ayarları içerir
const api = axios.create({
  baseURL: API_URL,         // Tüm isteklerin başına eklenecek temel URL
  timeout: 5000,            // İstek zaman aşımı süresi (5 saniye)
  headers: {
    'Content-Type': 'application/json',  // İsteklerin içerik türü JSON olarak ayarlanır
  }
});

// Request interceptor - Her istekte otomatik olarak token ekler
// Interceptor, her istek gönderilmeden önce çalışan bir ara yazılımdır
// Bu sayede her API çağrısında manuel olarak token eklemek zorunda kalmayız
api.interceptors.request.use(
  (config) => {
    // Local storage'dan access token'ı al
    const token = localStorage.getItem('access_token');
    // Eğer token varsa, isteğin header'ına ekle
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // JWT token formatı: "Bearer [token]"
    }
    return config;
  },
  (error) => {
    // İstek gönderilirken hata oluşursa, hatayı fırlat
    return Promise.reject(error);
  }
);

// -------------------------
// Authentication İstekleri (Kimlik Doğrulama İşlemleri)
// -------------------------

/**
 * Kullanıcı Kaydı (Register) Fonksiyonu
 * 
 * @param {Object} userData - Kullanıcı kayıt bilgileri (email, password, first_name, last_name, vb.)
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, yeni bir kullanıcı hesabı oluşturmak için kullanılır.
 * Başarılı kayıt sonrası, kullanıcı bilgileri ve token'lar localStorage'a kaydedilir.
 */
export const register = async (userData) => {
  try {
    // Backend'e POST isteği gönder
    const response = await api.post('register/', userData);
    
    // Token ve kullanıcı bilgilerini localStorage'a kaydet
    // Bu bilgiler, kullanıcı oturumunu sürdürmek için kullanılır
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);       // Erişim token'ı
      localStorage.setItem('refresh_token', response.data.tokens.refresh);     // Yenileme token'ı
      localStorage.setItem('user', JSON.stringify(response.data.user));        // Kullanıcı bilgileri
    }
    
    // API yanıtını döndür
    return response.data;
  } catch (error) {
    // Hata durumunda, API'den gelen hata mesajını veya genel hata mesajını fırlat
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Kullanıcı Girişi (Login) Fonksiyonu
 * 
 * @param {string} email - Kullanıcının e-posta adresi
 * @param {string} password - Kullanıcının şifresi
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, kullanıcının sisteme giriş yapması için kullanılır.
 * Başarılı giriş sonrası, kullanıcı bilgileri ve token'lar localStorage'a kaydedilir.
 */
export const login = async (email, password) => {
  try {
    // Backend'e POST isteği gönder
    const response = await api.post('login/', { email, password });
    
    // Token ve kullanıcı bilgilerini localStorage'a kaydet
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);       // Erişim token'ı
      localStorage.setItem('refresh_token', response.data.tokens.refresh);     // Yenileme token'ı
      localStorage.setItem('user', JSON.stringify(response.data.user));        // Kullanıcı bilgileri
    }
    
    // API yanıtını döndür
    return response.data;
  } catch (error) {
    // Hata durumunda, API'den gelen hata mesajını veya genel hata mesajını fırlat
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Kullanıcı Çıkışı (Logout) Fonksiyonu
 * 
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, kullanıcının sistemden çıkış yapması için kullanılır.
 * Çıkış işlemi sonrası, localStorage'dan tüm kullanıcı bilgileri ve token'lar silinir.
 */
export const logout = async () => {
  try {
    // Backend'e logout isteği gönder
    const response = await api.post('logout/');
    
    // Local storage'dan token'ları ve kullanıcı bilgilerini temizle
    // Bu işlem, kullanıcı oturumunu sonlandırmak için gereklidir
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // API yanıtını döndür
    return response.data;
  } catch (error) {
    // Hata olsa bile local storage'ı temizle
    // Bu, kullanıcının her durumda çıkış yapabilmesini sağlar
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // Hatayı fırlat
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Şifremi Unuttum Fonksiyonu
 * 
 * @param {string} email - Kullanıcının e-posta adresi
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, kullanıcının şifresini sıfırlaması için kullanılır.
 * Kullanıcıya yeni şifre e-posta ile gönderilir.
 */
export const forgotPassword = async (email) => {
  try {
    // Backend'e POST isteği gönder
    const response = await api.post('forgot-password/', { email });
    return response.data;
  } catch (error) {
    // Hata durumunda, API'den gelen hata mesajını veya genel hata mesajını fırlat
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Şifre Sıfırlama Onay Fonksiyonu
 * 
 * @param {string} uid - Kullanıcı ID'si (base64 kodlanmış)
 * @param {string} token - Şifre sıfırlama token'ı
 * @param {string} newPassword - Kullanıcının yeni şifresi
 * @param {string} confirmPassword - Kullanıcının tekrar girdiği şifre
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, kullanıcının şifresini sıfırlamak için kullanılır.
 * E-posta ile gelen token ve yeni şifre ile şifre sıfırlama işlemi gerçekleştirilir.
 */
export const resetPasswordConfirm = async (uid, token, newPassword, confirmPassword) => {
  try {
    // Backend'e POST isteği gönder
    const response = await api.post('reset-password/', { 
      uid,
      token, 
      new_password: newPassword,
      confirm_password: confirmPassword
    });
    return response.data;
  } catch (error) {
    // Hata durumunda, API'den gelen hata mesajını veya genel hata mesajını fırlat
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Şifre Değiştirme Fonksiyonu
 * 
 * @param {string} currentPassword - Kullanıcının mevcut şifresi
 * @param {string} newPassword - Kullanıcının yeni şifresi
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, kullanıcının şifresini değiştirmek için kullanılır.
 * Mevcut şifre doğrulandıktan sonra yeni şifre kaydedilir.
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    // Backend'e POST isteği gönder
    const response = await api.post('change-password/', { 
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  } catch (error) {
    // Hata durumunda, API'den gelen hata mesajını veya genel hata mesajını fırlat
    throw error.response ? error.response.data : error.message;
  }
};

// --------------------
// Yardımcı Fonksiyonlar
// --------------------

/**
 * Kullanıcının Giriş Yapmış Olup Olmadığını Kontrol Et
 * 
 * @returns {boolean} - Kullanıcı giriş yapmışsa true, yapmamışsa false döner
 * 
 * Bu fonksiyon, kullanıcının giriş yapmış olup olmadığını kontrol eder.
 * localStorage'da access_token varsa, kullanıcı giriş yapmış demektir.
 */
export const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null;
};

/**
 * Mevcut Kullanıcı Bilgilerini Getir
 * 
 * @returns {Object|null} - Kullanıcı bilgileri veya null
 * 
 * Bu fonksiyon, localStorage'dan mevcut kullanıcı bilgilerini getirir.
 * Kullanıcı bilgileri yoksa null döner.
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Backend Bağlantı Testi
 * 
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, frontend'in backend'e bağlanabildiğini test etmek için kullanılır.
 * Basit bir GET isteği göndererek backend'in çalışıp çalışmadığını kontrol eder.
 */
export const testBackendConnection = async () => {
  try {
    // Backend'e basit bir GET isteği gönder
    // Bu istek, backend'in çalışıp çalışmadığını kontrol etmek için kullanılır
    const response = await api.get('');  // Ana API endpoint'ine istek gönder
    
    return {
      success: true,
      message: 'Backend bağlantısı başarılı!',
      data: response.data
    };
  } catch (error) {
    // Bağlantı hatası durumunda
    return {
      success: false,
      message: 'Backend bağlantısı başarısız!',
      error: error.message
    };
  }
};

/**
 * Şehirler Listesini Getir
 * 
 * @returns {Promise} - API'den dönen şehirler listesi
 * 
 * Bu fonksiyon, backend'den Türkiye'deki şehirlerin listesini getirir.
 * Kayıt formunda ve kullanıcı profilinde şehir seçimi için kullanılır.
 */
export const getCities = async () => {
  try {
    const response = await api.get('cities/');
    return response.data;
  } catch (error) {
    console.error("Şehirler listesi alınamadı:", error);
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Kullanıcı Profili Güncelleme Fonksiyonu
 * 
 * @param {Object} userData - Güncellenecek kullanıcı bilgileri
 * @returns {Promise} - API'den dönen yanıt
 */
export const updateUserProfile = async (userData) => {
  try {
    // API isteği
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    throw error.response?.data || { error: "Profil güncellenemedi" };
  }
};

export default api;
