import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('routes');
  
  // Admin rolü kontrolü
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      // Kullanıcı admin değilse ana sayfaya yönlendir
      navigate('/');
    }
  }, [isAuthenticated, user, loading, navigate]);
  
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
  
  // Admin dashboard içeriği
  return (
    <div style={{ 
      padding: '30px', 
      backgroundColor: '#f5f7fa', 
      minHeight: 'calc(100vh - 60px)'
    }}>
      <h2 style={{ 
        marginBottom: '25px', 
        color: '#6D213C', 
        borderBottom: '2px solid #eee', 
        paddingBottom: '10px'
      }}>
        Admin Kontrol Paneli
      </h2>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ 
          width: '250px', 
          backgroundColor: '#fff', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          padding: '15px',
          marginRight: '20px'
        }}>
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'routes' ? '#6D213C' : 'transparent',
            color: activeTab === 'routes' ? '#fff' : '#333',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '5px'
          }} onClick={() => setActiveTab('routes')}>
            Otobüs Hatları
          </div>
          
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'buses' ? '#6D213C' : 'transparent',
            color: activeTab === 'buses' ? '#fff' : '#333',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '5px'
          }} onClick={() => setActiveTab('buses')}>
            Otobüs Özellikleri
          </div>
          
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: '6px',
            backgroundColor: activeTab === 'schedule' ? '#6D213C' : 'transparent',
            color: activeTab === 'schedule' ? '#fff' : '#333',
            fontWeight: '500',
            cursor: 'pointer'
          }} onClick={() => setActiveTab('schedule')}>
            Sefer Planları
          </div>
        </div>
        
        <div style={{ 
          flex: 1, 
          backgroundColor: '#fff', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          padding: '20px'
        }}>
          {activeTab === 'routes' && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Otobüs Hatları Yönetimi</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Bu bölümden otobüs hatlarını ekleyebilir, düzenleyebilir veya kaldırabilirsiniz.
              </p>
              
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                <p>Bu özellik şu anda geliştirme aşamasındadır.</p>
                <p>Otobüs hatları yakında buradan yönetilebilecek.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'buses' && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Otobüs Özellikleri Yönetimi</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Bu bölümden otobüslerin özelliklerini (kapasite, model, vb.) yönetebilirsiniz.
              </p>
              
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                <p>Bu özellik şu anda geliştirme aşamasındadır.</p>
                <p>Otobüs özellikleri yakında buradan yönetilebilecek.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Sefer Planları Yönetimi</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Bu bölümden sefer planlarını oluşturabilir, düzenleyebilir veya iptal edebilirsiniz.
              </p>
              
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                <p>Bu özellik şu anda geliştirme aşamasındadır.</p>
                <p>Sefer planları yakında buradan yönetilebilecek.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>Sistem Durumu</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ 
            flex: 1, 
            backgroundColor: '#f8f9fa', 
            borderRadius: '6px', 
            padding: '15px',
            marginRight: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>TOPLAM ROTA</h4>
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#6D213C' }}>0</span>
          </div>
          
          <div style={{ 
            flex: 1, 
            backgroundColor: '#f8f9fa', 
            borderRadius: '6px', 
            padding: '15px',
            marginRight: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>TOPLAM OTOBÜS</h4>
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#6D213C' }}>0</span>
          </div>
          
          <div style={{ 
            flex: 1, 
            backgroundColor: '#f8f9fa', 
            borderRadius: '6px', 
            padding: '15px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>GÜNLÜK SEFER</h4>
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#6D213C' }}>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 