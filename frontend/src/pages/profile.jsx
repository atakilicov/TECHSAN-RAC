import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateUserProfile, logout, deleteAccount } from '../api';



//merhaba berk test

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    address: user?.address || "", 
    city: user?.city || "",
    birth_date: user?.birth_date ? new Date(user.birth_date).toISOString().split('T')[0] : ""
  });
  const [userData, setUserData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();

  // Profil sayfası için modern renkler
  const colors = {
    primary: '#6D213C', /* Açık bordo tonu */
    primaryLight: 'rgba(230, 126, 34, 0.1)',
    primaryDark: '#d35400',
    secondary: '#9A3158', /* Daha açık, canlı bordo */
    secondaryLight: 'rgba(125, 90, 60, 0.1)',
    tertiary: '#300A10', /* Koyu bordo, istenen renk kodu */
    cardBg: '#fff',
    cardBgDark: '#f9f9f9',
    textDark: '#333',
    textMedium: '#666',
    textLight: '#868e96',
    border: '#dee2e6',
    success: '#2ecc71',
    successLight: 'rgba(46, 204, 113, 0.1)',
    error: '#e74c3c',
    errorLight: 'rgba(231, 76, 60, 0.1)',
    background: '#f8f9fa',
    text: '#343a40'
  };

  // Eğer kullanıcı giriş yapmamışsa, giriş yapma uyarısı göster
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 100px)',
        background: 'linear-gradient(135deg, #f9f9f9, #f0f0f0)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '400px',
          backgroundColor: colors.cardBg,
          borderRadius: '15px',
          padding: '2.5rem',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            backgroundColor: colors.primaryLight,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill={colors.primary}/>
            </svg>
          </div>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: colors.textDark,
            marginBottom: '1rem'
          }}>PROFİL SAYFASI</h3>
          <p style={{
            padding: '1rem',
            backgroundColor: colors.errorLight,
            color: colors.error,
            borderRadius: '10px',
            marginBottom: '1.5rem',
            fontWeight: '500'
          }}>Lütfen giriş yapın.</p>
          <a href="/login" style={{
            display: 'inline-block',
            backgroundColor: colors.primary,
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(48, 10, 16, 0.2)'
          }}>Giriş Yap</a>
        </div>
      </div>
    );
  }

  // Form verilerini güncelleme fonksiyonu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Profil güncelleme API isteği
  const updateProfile = async (userData) => {
    try {
      // API URL'sini düzeltiyoruz - sonuna / ekliyoruz
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      
      console.log('Profil güncellemesi için gönderilen veri:', userData);
      
      // Token bilgisini alıp console'a yazdıralım (debug için)
      const token = localStorage.getItem('access_token');
      console.log('Kullanılan token:', token ? `${token.substring(0, 15)}...` : 'Token bulunamadı');
      
      // Doğru formatta URL oluşturalım - URL sonuna slash (/) ekliyoruz
      const response = await axios.put(`${apiUrl}/users/profile/`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error("Profil güncellenirken hata:", error);
      if (error.response) {
        console.error("Hata yanıtı:", error.response.data);
        console.error("Hata durumu:", error.response.status);
        throw error.response.data;
      }
      throw { error: "Profil güncellenemedi" };
    }
  };

  // Formu gönderme fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      // Profil güncelleme API isteği gönder
      console.log("Profil güncellemesi için form verileri:", formData);
      const updatedUser = await updateProfile(formData);
      console.log("Güncellenmiş kullanıcı verisi:", updatedUser);
      
      // Context'teki kullanıcı verisini güncelle
      // AuthContext'teki setUser fonksiyonu aynı zamanda localStorage'ı da güncelliyor
      const newUserData = {
        ...user,
        ...updatedUser
      };
      console.log("Context için yeni kullanıcı verisi:", newUserData);
      setUser(newUserData);
      
      // Başarı mesajı göster
      setMessage("Profiliniz başarıyla güncellendi.");
      setIsEditing(false);
    } catch (error) {
      // Backend'in gönderdiği hata mesajını göster
      console.error("Profil güncelleme hatası:", error);
      
      if (error && typeof error === 'object') {
        if (error.error) {
          setMessage(error.error);
        } else if (error.detail) {
          setMessage(error.detail);
        } else {
          setMessage("Profil güncellenemedi, lütfen tekrar deneyin.");
        }
      } else {
        setMessage("Profil güncellenemedi, lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Hesap silme işlevi
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    
    try {
      await deleteAccount();
      logout(); // Kullanıcıyı logout yap
      navigate('/login'); // Login sayfasına yönlendir
    } catch (error) {
      console.error("Hesap silme hatası:", error);
      setDeleteError(typeof error === 'object' ? 
        (error.error || error.message || "Hesap silinemedi.") : 
        error || "Hesap silinemedi."
      );
      setDeleteLoading(false);
    }
  };

  // Delete Account Modal
  const renderDeleteModal = () => {
    if (!showDeleteModal) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '0 20px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '25px',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#6D213C',
            fontSize: '1.4rem'
          }}>Hesabınızı Silmek İstediğinize Emin Misiniz?</h3>
          
          <p style={{
            margin: '0 0 20px 0',
            color: '#555',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            Bu işlem geri alınamaz. Hesabınız kalıcı olarak silinecek ve tüm verileriniz kaybolacaktır.
          </p>
          
          {deleteError && (
            <div style={{
              backgroundColor: 'rgba(202, 43, 43, 0.1)',
              color: '#c62828',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              fontSize: '0.9rem'
            }}>
              {deleteError}
            </div>
          )}
          
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button 
              style={{
                padding: '10px 15px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#f5f5f5',
                color: '#333',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
              onClick={() => setShowDeleteModal(false)}
              disabled={deleteLoading}
            >
              İptal
            </button>
            
            <button 
              style={{
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#d32f2f',
                color: '#fff',
                cursor: deleteLoading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                opacity: deleteLoading ? 0.7 : 1
              }}
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'İşleniyor...' : 'Hesabımı Sil'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Profil bilgileri gösterimi veya düzenleme formu
  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit} style={{
          marginTop: '1.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Form Alanları */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.textMedium
              }}>Ad</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  '&:focus': {
                    borderColor: colors.primary
                  }
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.textMedium
              }}>Soyad</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.textMedium
              }}>Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.textMedium
              }}>Adres</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.textMedium
              }}>Şehir</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.textMedium
              }}>Doğum Tarihi</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: 'white',
                color: colors.textMedium,
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              İPTAL
            </button>
            
            <button 
              type="submit"
              disabled={loading}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: loading ? colors.textLight : colors.primary,
                color: 'white',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#7A2945';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = colors.primary;
                }
              }}
            >
              {loading && (
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  animation: 'spin 1s linear infinite'
                }}></div>
              )}
              KAYDET
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '1.5rem'
        }}>
          {/* Mevcut profil bilgi kartları buraya gelecek */}
          {/* Telefon kartı */}
          <div style={{
            backgroundColor: colors.cardBgDark,
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)'
            }
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM19 12H21C21 7 17 3 12 3V5C15.9 5 19 8.1 19 12ZM15 12H17C17 9.2 14.8 7 12 7V9C13.7 9 15 10.3 15 12Z" fill={colors.primary}/>
              </svg>
            </div>
            <div>
              <div style={{
                color: colors.textLight,
                fontSize: '0.9rem',
                marginBottom: '0.3rem'
              }}>Telefon</div>
              <div style={{
                color: colors.textDark,
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>{user.phone || "Belirtilmemiş"}</div>
            </div>
          </div>
          
          {/* Adres kartı */}
          <div style={{
            backgroundColor: colors.cardBgDark,
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={colors.primary}/>
              </svg>
            </div>
            <div>
              <div style={{
                color: colors.textLight,
                fontSize: '0.9rem',
                marginBottom: '0.3rem'
              }}>Adres</div>
              <div style={{
                color: colors.textDark,
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>{user.address || "Belirtilmemiş"}</div>
            </div>
          </div>
            
          {/* Şehir kartı */}
          <div style={{
            backgroundColor: colors.cardBgDark,
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 11V5L12 2L9 5V7H3V21H21V11H15ZM7 19H5V17H7V19ZM7 15H5V13H7V15ZM7 11H5V9H7V11ZM13 19H11V17H13V19ZM13 15H11V13H13V15ZM13 11H11V9H13V11ZM13 7H11V5H13V7ZM19 19H17V17H19V19ZM19 15H17V13H19V15Z" fill={colors.primary}/>
              </svg>
            </div>
            <div>
              <div style={{
                color: colors.textLight,
                fontSize: '0.9rem',
                marginBottom: '0.3rem'
              }}>Şehir</div>
              <div style={{
                color: colors.textDark,
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>{user.city || "Belirtilmemiş"}</div>
            </div>
          </div>
            
          {/* Doğum Tarihi kartı */}
          <div style={{
            backgroundColor: colors.cardBgDark,
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill={colors.primary}/>
              </svg>
            </div>
            <div>
              <div style={{
                color: colors.textLight,
                fontSize: '0.9rem',
                marginBottom: '0.3rem'
              }}>Doğum Tarihi</div>
              <div style={{
                color: colors.textDark,
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>{user.birth_date ? new Date(user.birth_date).toLocaleDateString('tr-TR') : "Belirtilmemiş"}</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="profile-container" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/images/Rollsroyce.jpeg")',
      minHeight: 'calc(100vh - 80px)',
      padding: '3rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Profil Başlık Kartı */}
        <div style={{
          backgroundColor: colors.cardBg,
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          {/* Süslü efekt */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '150px',
            height: '150px',
            backgroundImage: `radial-gradient(circle at 0 0, transparent 0, ${colors.primaryLight} 50%)`,
            opacity: 0.7,
            zIndex: 0
          }}></div>
          
          {/* Profil avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            backgroundColor: colors.primaryLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            color: colors.primary,
            boxShadow: '0 10px 25px rgba(48, 10, 16, 0.15)',
            position: 'relative',
            border: `3px solid ${colors.cardBg}`,
            margin: '0 auto',
            zIndex: 1
          }}>
            {user.first_name?.[0]}{user.last_name?.[0]}
          </div>
          
          {/* Kullanıcı adı */}
          <div style={{zIndex: 1}}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: colors.textDark,
              marginBottom: '0.5rem'
            }}>{user.first_name} {user.last_name}</h2>
            <p style={{
              fontSize: '1.1rem',
              color: colors.textMedium
            }}>{user.email}</p>
          </div>
          
          {/* Tab menüsü */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            zIndex: 1
          }}>
            <button 
              onClick={() => setActiveTab("profile")}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: activeTab === "profile" ? colors.primary : colors.primaryLight,
                color: activeTab === "profile" ? '#fff' : colors.primary,
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Profil Bilgileri
            </button>
            <button 
              onClick={() => setActiveTab("courses")}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: activeTab === "courses" ? colors.primary : colors.primaryLight,
                color: activeTab === "courses" ? '#fff' : colors.primary,
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Kiralamalarım
            </button>
          </div>
        </div>
        
        {/* Ana içerik */}
        {activeTab === "profile" ? (
          <div style={{
            backgroundColor: colors.cardBg,
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.05)',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              color: colors.textDark,
              marginBottom: '2rem',
              position: 'relative',
              paddingBottom: '0.8rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ marginRight: 'auto' }}>
                Kişisel Bilgiler
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  backgroundColor: colors.primary,
                  borderRadius: '2px'
                }}></span>
              </div>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  backgroundColor: isEditing ? colors.textLight : colors.primary,
                  color: '#fff',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(48, 10, 16, 0.15)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(48, 10, 16, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(48, 10, 16, 0.15)';
                }}
              >
                {isEditing ? 'DÜZENLEMEYİ İPTAL ET' : 'PROFİLİ DÜZENLE'}
              </button>
            </h3>
            
            {message && (
              <div style={{
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: message.includes("başarıyla") ? colors.successLight : colors.errorLight,
                color: message.includes("başarıyla") ? colors.success : colors.error,
                marginBottom: '1.5rem',
                fontWeight: '500'
              }}>
                {message}
              </div>
            )}
            
            {loading && (
              <div style={{
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: colors.primaryLight,
                color: colors.primary,
                marginBottom: '1.5rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${colors.primary}`,
                  borderTopColor: 'transparent',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Profil bilgileriniz güncelleniyor...
              </div>
            )}
            
            {renderProfileContent()}
            
            {/* Şifre Yönetimi Bölümü - Kişisel bilgilerin altına ekleniyor */}
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              color: colors.textDark,
              marginTop: '3rem',
              marginBottom: '2rem',
              position: 'relative',
              paddingBottom: '0.8rem'
            }}>
              Şifre Yönetimi
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '60px',
                height: '3px',
                backgroundColor: colors.primary,
                borderRadius: '2px'
              }}></span>
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              {/* Şifre Değiştir Kartı */}
              <div style={{
                backgroundColor: colors.cardBgDark,
                borderRadius: '15px',
                padding: '1.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)'
                }
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: colors.primaryLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" fill={colors.primary}/>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      color: colors.textDark,
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem'
                    }}>Şifremi Değiştir</div>
                    <div style={{
                      color: colors.textLight,
                      fontSize: '0.9rem',
                    }}>Mevcut şifrenizi yeni bir şifre ile değiştirin</div>
                  </div>
                </div>
                <Link 
                  to="/change-password"
                  style={{
                    marginTop: 'auto',
                    padding: '0.8rem 1rem',
                    backgroundColor: colors.primary,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7A2945';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  ŞİFREMİ DEĞİŞTİR
                </Link>
              </div>
              
              {/* Şifremi Unuttum Kartı */}
              <div style={{
                backgroundColor: colors.cardBgDark,
                borderRadius: '15px',
                padding: '1.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)'
                }
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: colors.primaryLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20zM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill={colors.primary}/>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      color: colors.textDark,
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem'
                    }}>Şifremi Unuttum</div>
                    <div style={{
                      color: colors.textLight,
                      fontSize: '0.9rem',
                    }}>Şifrenizi hatırlamıyorsanız sıfırlayın</div>
                  </div>
                </div>
                <Link 
                  to="/forgot-password"
                  style={{
                    marginTop: 'auto',
                    padding: '0.8rem 1rem',
                    backgroundColor: 'transparent',
                    color: colors.primary,
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    border: `1px solid ${colors.primary}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(154, 49, 88, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  ŞİFREMİ UNUTTUM
                </Link>
              </div>
            </div>
            
            {/* Hesap Silme Bölümü */}
            <div style={{ 
              marginTop: '2rem',
              padding: '1rem',
              border: '1px solid #f1f1f1',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 240, 240, 0.2)'
            }}>
              <h4 style={{ color: '#d32f2f', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Tehlikeli Bölge
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                Hesabınızı silmek istiyorsanız, tüm verileriniz kalıcı olarak silinecektir.
              </p>
              <button 
                onClick={() => setShowDeleteModal(true)}
                style={{
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Hesabımı Sil
              </button>
            </div>
          </div>
        ) : (
          // Kurslar Sekmesi
          <div style={{
            backgroundColor: colors.cardBg,
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.05)',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              color: colors.textDark,
              marginBottom: '2rem',
              position: 'relative',
              paddingBottom: '0.8rem'
            }}>
              Kiralama Geçmişim
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '60px',
                height: '3px',
                backgroundColor: colors.primary,
                borderRadius: '2px'
              }}></span>
            </h3>
            
            <div style={{
              background: `linear-gradient(135deg, ${colors.primaryLight}, rgba(255,255,255,0.6))`,
              borderRadius: '15px',
              padding: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
              border: `1px solid ${colors.border}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.03)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                backgroundColor: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(48, 10, 16, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `url('/images/cars/rolls-royce-phantom.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.4
                }}></div>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'relative', zIndex: 1}}>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" fill="white"/>
                </svg>
              </div>
              <div style={{flex: 1}}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: colors.textDark,
                  marginBottom: '0.5rem'
                }}>Rolls-Royce Phantom</h4>
                <p style={{
                  color: colors.textMedium,
                  marginBottom: '1rem',
                  fontSize: '0.95rem'
                }}>15 Mart 2023 - 20 Mart 2023</p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(46, 204, 113, 0.15)',
                    color: '#2ecc71',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '5px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>Tamamlandı</span>
                  <span style={{
                    color: colors.textMedium,
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>İstanbul</span>
                </div>
              </div>
              
              {/* Sağ taraftaki fiyat bilgisi */}
              <div style={{
                marginLeft: 'auto',
                textAlign: 'right',
                paddingLeft: '1rem',
                borderLeft: `1px solid ${colors.border}`
              }}>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: colors.primary,
                  marginBottom: '0.3rem'
                }}>₺15,750</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: colors.textLight
                }}>5 gün</div>
              </div>
            </div>
            
            {/* İkinci kiralama örneği */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.primaryLight}, rgba(255,255,255,0.6))`,
              borderRadius: '15px',
              padding: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
              border: `1px solid ${colors.border}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.03)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                backgroundColor: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(48, 10, 16, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `url('/images/cars/bentley-continental.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.4
                }}></div>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'relative', zIndex: 1}}>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" fill="white"/>
                </svg>
              </div>
              <div style={{flex: 1}}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: colors.textDark,
                  marginBottom: '0.5rem'
                }}>Bentley Continental GT</h4>
                <p style={{
                  color: colors.textMedium,
                  marginBottom: '1rem',
                  fontSize: '0.95rem'
                }}>5 Şubat 2023 - 7 Şubat 2023</p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(46, 204, 113, 0.15)',
                    color: '#2ecc71',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '5px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>Tamamlandı</span>
                  <span style={{
                    color: colors.textMedium,
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>Ankara</span>
                </div>
              </div>
              
              {/* Sağ taraftaki fiyat bilgisi */}
              <div style={{
                marginLeft: 'auto',
                textAlign: 'right',
                paddingLeft: '1rem',
                borderLeft: `1px solid ${colors.border}`
              }}>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: colors.primary,
                  marginBottom: '0.3rem'
                }}>₺8,500</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: colors.textLight
                }}>2 gün</div>
              </div>
            </div>
            
            {/* Yakında başlayacak kiralamalar */}
            <div style={{
              marginTop: '3rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Dekoratif araba ikonu */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: `url('/images/cars/luxury-car-silhouette.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                opacity: 0.05,
                transform: 'rotate(15deg)'
              }}></div>
              
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: colors.textDark,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                position: 'relative',
                zIndex: 1
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20zM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill={colors.primary}/>
                </svg>
                Yaklaşan Kiralamalar
              </h4>
              <div style={{
                padding: '1.5rem',
                textAlign: 'center',
                color: colors.textMedium,
                position: 'relative',
                zIndex: 1
              }}>
                <p>Şu anda yaklaşan bir kiralama bulunamadı.</p>
                <div style={{
                  marginTop: '1.5rem'
                }}>
                  <button style={{
                    backgroundColor: colors.primaryLight,
                    color: colors.primary,
                    padding: '0.8rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryLight;
                    e.currentTarget.style.color = colors.primary;
                  }}>
                    ARAÇLARI İNCELE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {renderDeleteModal()}
      
      {/* CSS Animasyonları */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Profile; 