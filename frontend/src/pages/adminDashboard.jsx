import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getCars, deleteCar } from '../api';

const AdminDashboard = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Admin rolü kontrolü
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      // Kullanıcı admin değilse ana sayfaya yönlendir
      navigate('/');
    }
  }, [isAuthenticated, user, loading, navigate]);
  
  // Araç listesini yükleme
  useEffect(() => {
    if (activeTab === 'cars' && isAuthenticated && user?.role === 'admin') {
      fetchCars();
    }
  }, [activeTab, isAuthenticated, user]);
  
  // Araçları getir
  const fetchCars = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getCars();
      setCars(data);
    } catch (err) {
      setError('Araç listesi yüklenirken bir hata oluştu.');
      console.error('Araç yükleme hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Araç silme işlemi
  const handleDeleteCar = async (carId) => {
    if (window.confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
      setIsLoading(true);
      
      try {
        await deleteCar(carId);
        // Listeden kaldır
        setCars(cars.filter(car => car.id !== carId));
      } catch (err) {
        setError('Araç silinirken bir hata oluştu.');
        console.error('Araç silme hatası:', err);
      } finally {
        setIsLoading(false);
      }
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
        backgroundColor: '#121212'
      }}>
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          backgroundColor: '#1E1E1E',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(255,255,255,0.1)',
            borderTopColor: '#EC407A',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '15px', color: '#fff' }}>Yükleniyor...</p>
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
  
  // Admin dashboard içeriği
  return (
    <div style={{ 
      padding: '30px', 
      backgroundColor: '#121212', 
      minHeight: 'calc(100vh - 60px)',
      color: '#fff'
    }}>
      <h2 style={{ 
        marginBottom: '25px', 
        color: '#EC407A', 
        borderBottom: '2px solid rgba(255,255,255,0.1)', 
        paddingBottom: '10px'
      }}>
        Admin Kontrol Paneli
      </h2>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ 
          width: '250px', 
          backgroundColor: '#1E1E1E', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          padding: '15px',
          marginRight: '20px'
        }}>
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'cars' ? '#EC407A' : 'transparent',
            color: activeTab === 'cars' ? '#fff' : 'rgba(255,255,255,0.7)',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '5px',
            transition: 'all 0.3s ease'
          }} onClick={() => setActiveTab('cars')}>
            Araç Yönetimi
          </div>
          
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'routes' ? '#EC407A' : 'transparent',
            color: activeTab === 'routes' ? '#fff' : 'rgba(255,255,255,0.7)',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '5px',
            transition: 'all 0.3s ease'
          }} onClick={() => setActiveTab('routes')}>
            Otobüs Hatları
          </div>
          
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'buses' ? '#EC407A' : 'transparent',
            color: activeTab === 'buses' ? '#fff' : 'rgba(255,255,255,0.7)',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '5px',
            transition: 'all 0.3s ease'
          }} onClick={() => setActiveTab('buses')}>
            Otobüs Özellikleri
          </div>
          
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'schedule' ? '#EC407A' : 'transparent',
            color: activeTab === 'schedule' ? '#fff' : 'rgba(255,255,255,0.7)',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} onClick={() => setActiveTab('schedule')}>
            Sefer Planları
          </div>
        </div>
        
        <div style={{ 
          flex: 1, 
          backgroundColor: '#1E1E1E', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          padding: '20px'
        }}>
          {activeTab === 'cars' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#fff', margin: 0 }}>Araç Yönetimi</h3>
                
                <button 
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#EC407A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease'
                  }}
                  onClick={() => navigate('/admin/cars/create')}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#FF5E92'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#EC407A'}
                >
                  Yeni Araç Ekle
                </button>
              </div>
              
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                Bu bölümden araçları ekleyebilir, düzenleyebilir veya kaldırabilirsiniz.
              </p>
              
              {error && (
                <div style={{ 
                  padding: '10px 15px', 
                  backgroundColor: 'rgba(255,0,0,0.1)', 
                  color: '#ff6b6b', 
                  borderRadius: '4px',
                  marginBottom: '15px'
                }}>
                  {error}
                </div>
              )}
              
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#EC407A',
                    borderRadius: '50%',
                    margin: '0 auto',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.7)' }}>Araçlar yükleniyor...</p>
                </div>
              ) : (
                cars.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Marka</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Model</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Plaka</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Yıl</th>
                          <th style={{ padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Günlük Ücret</th>
                          <th style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Durum</th>
                          <th style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map((car) => (
                          <tr key={car.id} style={{ 
                            backgroundColor: 'transparent', 
                            borderBottom: '1px solid rgba(255,255,255,0.1)' 
                          }}>
                            <td style={{ padding: '12px 15px', color: '#fff' }}>{car.brand}</td>
                            <td style={{ padding: '12px 15px', color: '#fff' }}>{car.model}</td>
                            <td style={{ padding: '12px 15px', color: '#fff' }}>{car.plate_number}</td>
                            <td style={{ padding: '12px 15px', color: '#fff' }}>{car.year}</td>
                            <td style={{ padding: '12px 15px', textAlign: 'right', color: '#fff' }}>{car.daily_price} TL</td>
                            <td style={{ 
                              padding: '12px 15px', 
                              textAlign: 'center', 
                              color: car.status === 'available' ? '#4CAF50' : '#FF5722' 
                            }}>
                              {car.status === 'available' ? 'Müsait' : 'Kiralandı'}
                            </td>
                            <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                              <button 
                                style={{
                                  backgroundColor: '#2196F3',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  marginRight: '5px',
                                  cursor: 'pointer'
                                }}
                                onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
                              >
                                Düzenle
                              </button>
                              <button 
                                style={{
                                  backgroundColor: '#F44336',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                                onClick={() => handleDeleteCar(car.id)}
                              >
                                Sil
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px', 
                    color: 'rgba(255,255,255,0.7)' 
                  }}>
                    Henüz hiç araç eklenmemiş.
                  </div>
                )
              )}
            </div>
          )}
          
          {activeTab === 'routes' && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#fff' }}>Otobüs Hatları Yönetimi</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                Bu bölümden otobüs hatlarını ekleyebilir, düzenleyebilir veya kaldırabilirsiniz.
              </p>
              
              <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                <p>Bu özellik şu anda geliştirme aşamasındadır.</p>
                <p>Otobüs hatları yakında buradan yönetilebilecek.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'buses' && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#fff' }}>Otobüs Özellikleri Yönetimi</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                Bu bölümden otobüslerin özelliklerini (kapasite, model, vb.) yönetebilirsiniz.
              </p>
              
              <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                <p>Bu özellik şu anda geliştirme aşamasındadır.</p>
                <p>Otobüs özellikleri yakında buradan yönetilebilecek.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#fff' }}>Sefer Planları Yönetimi</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                Bu bölümden sefer planlarını oluşturabilir, düzenleyebilir veya iptal edebilirsiniz.
              </p>
              
              <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                <p>Bu özellik şu anda geliştirme aşamasındadır.</p>
                <p>Sefer planları yakında buradan yönetilebilecek.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#fff' }}>Sistem Durumu</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ 
            flex: 1, 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '6px', 
            padding: '15px',
            marginRight: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px' }}>TOPLAM ARAÇ</h4>
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>{cars.length || 0}</span>
          </div>
          
          <div style={{ 
            flex: 1, 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '6px', 
            padding: '15px',
            marginRight: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px' }}>TOPLAM ROTA</h4>
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>0</span>
          </div>
          
          <div style={{ 
            flex: 1, 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '6px', 
            padding: '15px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px' }}>AKTİF SEFERLER</h4>
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 