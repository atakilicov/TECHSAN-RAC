import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createCar, getCarOptions } from '../api';
import CarForm from '../components/CarForm';

// Popüler araba markaları ve modelleri
const popularBrands = [
  { value: 'Toyota', models: ['Corolla', 'Yaris', 'RAV4', 'Camry', 'C-HR'] },
  { value: 'Volkswagen', models: ['Golf', 'Passat', 'Polo', 'Tiguan', 'Jetta'] },
  { value: 'Renault', models: ['Clio', 'Megane', 'Symbol', 'Captur', 'Kadjar'] },
  { value: 'Ford', models: ['Focus', 'Fiesta', 'Kuga', 'Puma', 'Mondeo'] },
  { value: 'Hyundai', models: ['i20', 'i30', 'Tucson', 'Kona', 'Elantra'] },
  { value: 'Mercedes-Benz', models: ['A-Serisi', 'C-Serisi', 'E-Serisi', 'GLA', 'CLA'] },
  { value: 'BMW', models: ['1 Serisi', '3 Serisi', '5 Serisi', 'X1', 'X3'] },
  { value: 'Audi', models: ['A3', 'A4', 'A6', 'Q3', 'Q5'] },
  { value: 'Fiat', models: ['Egea', 'Panda', '500', 'Doblo', 'Tipo'] },
  { value: 'Honda', models: ['Civic', 'CR-V', 'Jazz', 'HR-V', 'Accord'] }
];

const CreateCar = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form durumu
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    plate_number: '',
    daily_price: '',
    car_type: '',
    status: 'available',
    description: '',
    color: '',
    seat_count: 5,
    fuel_type: '',
    transmission: '',
    image: null
  });

  // Seçili markaya göre modelleri tut
  const [modelOptions, setModelOptions] = useState([]);
  
  // UI durumları
  const [options, setOptions] = useState({
    car_types: [
      {value: 'sedan', label: 'Sedan'}, {value: 'hatchback', label: 'Hatchback'},
      {value: 'suv', label: 'SUV'}, {value: 'crossover', label: 'Crossover'},
      {value: 'mpv', label: 'MPV'}, {value: 'coupe', label: 'Coupe'},
      {value: 'convertible', label: 'Convertible'}, {value: 'pickup', label: 'Pickup Truck'},
      {value: 'van', label: 'Van'}, {value: 'minivan', label: 'Minivan'},
    ],
    car_status: [
      {value: 'available', label: 'Müsait'}, {value: 'rented', label: 'Kiralandı'},
      {value: 'maintenance', label: 'Bakımda'}, {value: 'unavailable', label: 'Kullanım Dışı'},
    ],
    fuel_types: [
      {value: 'gasoline', label: 'Benzin'}, {value: 'diesel', label: 'Dizel'},
      {value: 'hybrid', label: 'Hibrit'}, {value: 'electric', label: 'Elektrik'},
      {value: 'lpg', label: 'LPG'},
    ],
    transmission_types: [
      {value: 'manual', label: 'Manuel'}, {value: 'automatic', label: 'Otomatik'},
      {value: 'semi_automatic', label: 'Yarı Otomatik'},
    ]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Admin yetkisi kontrolü
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/');
    }
  }, [isAuthenticated, user, loading, navigate]);
  
  // Araç seçeneklerini yükleme
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const optionsData = await getCarOptions();
        if (optionsData && Object.keys(optionsData).length > 0) {
          setOptions(prevOptions => ({ ...prevOptions, ...optionsData }));
        }
      } catch (error) {
        console.error('Araç seçenekleri yüklenirken hata:', error);
      }
    };
    
    fetchOptions();
  }, []);
  
  // Form girdilerini değiştirme
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'daily_price') {
      setFormData({ ...formData, [name]: value.replace(/[^0-9.]/g, '') });
    } else if (name === 'plate_number') {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else if (name === 'brand') {
      setFormData({ ...formData, [name]: value, model: '' });
      const selectedBrand = popularBrands.find(brand => brand.value === value);
      setModelOptions(selectedBrand ? selectedBrand.models : []);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: null });
  };
  
  // Form doğrulama
  const validateForm = () => {
    const errors = {};
    
    if (!formData.brand.trim()) errors.brand = 'Marka alanı zorunludur';
    if (!formData.model.trim()) errors.model = 'Model alanı zorunludur';
    if (!formData.year) errors.year = 'Yıl alanı zorunludur';
    if (!formData.plate_number.trim()) errors.plate_number = 'Plaka numarası zorunludur';
    if (!formData.daily_price) errors.daily_price = 'Günlük ücret zorunludur';
    if (!formData.car_type) errors.car_type = 'Araç türü seçmelisiniz';
    if (!formData.fuel_type) errors.fuel_type = 'Yakıt türü seçmelisiniz';
    if (!formData.transmission) errors.transmission = 'Şanzıman türü seçmelisiniz';
    
    // Plaka numarası Türkiye formatına uygun mu kontrol et
    const plateRegex = /^[0-9]{2}[\s-]?[A-Z]{1,3}[\s-]?[0-9]{2,4}$/;
    if (formData.plate_number && !plateRegex.test(formData.plate_number)) {
      errors.plate_number = 'Geçerli bir Türkiye plaka formatı giriniz (Örn: 34AB123, 06ABC123)';
    }
    
    return errors;
  };
  
  // Form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form doğrulama
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    setSubmitError(null);
    
    try {
      // FormData kullanarak resim ve diğer verileri gönder
      const data = new FormData();
      
      // Tüm form verilerini ekle
      Object.keys(formData).forEach(key => {
        // Resim alanını sadece seçilmişse gönder
        if (key === 'image') {
          if (formData[key] instanceof File) {
            data.append(key, formData[key], formData[key].name);
          }
        } else if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      
      // API isteği gönder
      await createCar(data);
      
      // Başarılı ise mesaj göster
      setSubmitSuccess(true);
      
      // 2 saniye sonra admin panel sayfasına yönlendir
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
      
    } catch (error) {
      console.error('Araç oluşturma hatası:', error);
      
      // API'den dönen hata mesajlarını işle
      if (error.plate_number) {
        setFormErrors({
          ...formErrors,
          plate_number: error.plate_number
        });
      } else {
        setSubmitError('Araç oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Yükleme durumu gösterimi
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f5f7fa'
      }}>
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f0f0f0',
            borderTopColor: '#6D213C',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '15px', color: '#333' }}>Yükleniyor...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  // Admin olmayan kullanıcı ve giriş yapmamış kullanıcılar için boş sayfa
  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // useEffect zaten yönlendirme yapacak
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#181818', paddingTop: 40 }}>
      <CarForm
        formData={formData}
        formErrors={formErrors}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin')}
        modelOptions={modelOptions}
        options={options}
        popularBrands={popularBrands}
      />
      {submitSuccess && (
        <div style={{
          background: '#2d8540',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center',
          margin: '24px auto',
          maxWidth: 480
        }}>
          Araç başarıyla oluşturuldu! Yönlendiriliyorsunuz...
        </div>
      )}
      {submitError && (
        <div style={{
          background: '#c22',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center',
          margin: '24px auto',
          maxWidth: 480
        }}>
          {submitError}
        </div>
      )}
    </div>
  );
};

export default CreateCar;
  