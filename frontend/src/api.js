import axios from 'axios';

// API'nin temel URL'i - Backend sunucusunun adresi
const API_ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_ENDPOINT_PATH = '/api';
const API_URL = `${API_ROOT_URL}${API_ENDPOINT_PATH}`;

export const API_BASE_URL = API_ROOT_URL; // Bunu dışa aktarıyoruz

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
    
    // Eğer veri FormData ise, Axios'un otomatik olarak Content-Type'ı ayarlamasına izin ver
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
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
    const response = await api.post('users/change-password/', { 
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  } catch (error) {
    // Hata durumunda, API'den gelen hata mesajını veya genel hata mesajını fırlat
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Kullanıcı Hesabı Silme Fonksiyonu
 * 
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, kullanıcının hesabını kalıcı olarak silmek için kullanılır.
 * İşlem başarılı olursa kullanıcı çıkış yapılır ve localStorage temizlenir.
 */
export const deleteAccount = async () => {
  try {
    // Backend'e DELETE isteği gönder
    const response = await api.delete('users/delete-account/');
    
    // Local storage'dan token'ları ve kullanıcı bilgilerini temizle
    // Bu işlem, kullanıcı oturumunu sonlandırmak için gereklidir
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // API yanıtını döndür
    return response.data;
  } catch (error) {
    // Hatayı fırlat
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

/**
 * Kullanıcı Profil Bilgilerini Getir
 * 
 * @returns {Promise} - API'den dönen kullanıcı profil bilgileri
 * 
 * Bu fonksiyon, giriş yapmış kullanıcının profil bilgilerini almak için kullanılır.
 * JWT token ile yetkilendirilmiş bir istek gönderilmesi gerekir.
 */
export const getProfile = async () => {
  try {
    const response = await api.get('users/profile/');
    return response.data;
  } catch (error) {
    console.error("Profil bilgileri alınamadı:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// -------------------------
// Car API İstekleri (Araç İşlemleri)
// -------------------------

/**
 * Araç Listesini Getirme Fonksiyonu
 * 
 * @returns {Promise} - API'den dönen araç listesi
 * 
 * Bu fonksiyon, sistemdeki tüm araçların listesini almak için kullanılır.
 */
export const getCars = async () => {
  try {
    const response = await api.get('cars/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Araç Detaylarını Getirme Fonksiyonu
 * 
 * @param {string|number} carId - Araç ID'si
 * @returns {Promise} - API'den dönen araç detayları
 * 
 * Bu fonksiyon, belirli bir aracın detaylarını almak için kullanılır.
 */
export const getCarDetails = async (carId) => {
  try {
    console.log(`cars/${carId}/ endpointine istek gönderiliyor...`);
    const response = await api.get(`cars/${carId}/`);
    console.log("API yanıtı (getCarDetails):", response.data);
    return response.data;
  } catch (error) {
    console.error("getCarDetails hata:", error);
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Yeni Araç Oluşturma Fonksiyonu
 * 
 * @param {Object} carData - Araç bilgileri
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, yeni bir araç eklemek için kullanılır.
 * Form data olarak gönderilmelidir, özellikle resim yüklemesi varsa.
 */
export const createCar = async (carData) => {
  try {
    // FormData kullanıldığında Axios otomatik olarak Content-Type'ı multipart/form-data olarak ayarlar
    // Ancak bazı durumlarda açıkça belirtmek daha güvenlidir
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    // API isteği gönder
    const response = await api.post('cars/', carData, config);
    return response.data;
  } catch (error) {
    console.error('API Hata Detayı:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Araç Güncelleme Fonksiyonu
 * 
 * @param {string|number} carId - Araç ID'si
 * @param {Object} carData - Güncellenecek araç bilgileri
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, belirli bir aracın bilgilerini güncellemek için kullanılır.
 */
export const updateCar = async (carId, carData) => {
  try {
    // carData bir FormData nesnesi olabilir, bu durumda headers otomatik olarak ayarlanır
    const response = await api.put(`cars/${carId}/`, carData);
    return response.data;
  } catch (error) {
    console.error('API Hata Detayı:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Araç Silme Fonksiyonu
 * 
 * @param {string|number} carId - Araç ID'si
 * @returns {Promise} - API'den dönen yanıt
 * 
 * Bu fonksiyon, belirli bir aracı sistemden silmek için kullanılır.
 */
export const deleteCar = async (carId) => {
  try {
    const response = await api.delete(`cars/${carId}/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Araç Seçenekleri Getirme Fonksiyonu
 * 
 * @returns {Promise} - API'den dönen araç türleri, yakıt türleri, vb. seçenekleri
 * 
 * Bu fonksiyon, araç formunda kullanılacak seçenekleri (araç türleri, yakıt türleri, vb.) 
 * almak için kullanılır.
 */
export const getCarOptions = async () => {
  try {
    console.log("cars/options/ endpointine istek gönderiliyor...");
    const response = await api.get('cars/options/');
    console.log("API yanıtı (getCarOptions):", response.data);
    return response.data;
  } catch (error) {
    console.error("getCarOptions hata:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Araç arama fonksiyonu
export const searchCars = async (params) => {
  try {
    // URL parametrelerini oluştur
    const queryParams = new URLSearchParams();
    
    // Parametreleri URL'e ekle (sadece değeri olanları)
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== '') {  // Boş string kontrolü eklendi
        queryParams.append(key, value.toLowerCase());  // Değerleri küçük harfe çevir
      }
    });
    
    const searchUrl = `cars/search/?${queryParams.toString()}`;
    console.log('Search URL:', searchUrl); // Debug için
    
    // GET isteği gönder
    const response = await api.get(searchUrl);
    console.log('Search API response:', response.data); // Debug için
    return response.data;
  } catch (error) {
    console.error('Search API error:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Araç filtreleme seçeneklerini getir
export const getCarFilterOptions = async () => {
  try {
    const response = await api.get('cars/filter-options/');
    return {
      brands: response.data.brands || [],
      models: response.data.models || [],
      carTypes: response.data.carTypes || [],
      fuelTypes: response.data.fuelTypes || [],
      years: response.data.years || [],
      minPrice: response.data.minPrice || 0,
      maxPrice: response.data.maxPrice || 0
    };
  } catch (error) {
    console.error('Filtre seçenekleri yükleme hatası:', error);
    // Varsayılan boş liste döndür
    return {
      brands: [],
      models: [],
      carTypes: [],
      fuelTypes: [],
      years: [],
      minPrice: 0,
      maxPrice: 0
    };
  }
};

export default api;
