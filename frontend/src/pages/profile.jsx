import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  // Profil sayfası için modern renkler
  const colors = {
    primary: '#E67E22',
    primaryLight: 'rgba(230, 126, 34, 0.1)',
    primaryDark: '#d35400',
    secondary: '#7D5A3C',
    secondaryLight: 'rgba(125, 90, 60, 0.1)',
    cardBg: '#fff',
    cardBgDark: '#f9f9f9',
    textDark: '#333',
    textMedium: '#666',
    textLight: '#999',
    border: 'rgba(0, 0, 0, 0.1)',
    success: '#2ecc71',
    successLight: 'rgba(46, 204, 113, 0.1)',
    error: '#e74c3c',
    errorLight: 'rgba(231, 76, 60, 0.1)'
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
            boxShadow: '0 8px 20px rgba(230, 126, 34, 0.2)'
          }}>Giriş Yap</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f9f9f9, #f0f0f0)',
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
            boxShadow: '0 10px 25px rgba(230, 126, 34, 0.15)',
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
              paddingBottom: '0.8rem'
            }}>
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
            </h3>
            
            {message && (
              <div style={{
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: message.includes("başarılı") ? colors.successLight : colors.errorLight,
                color: message.includes("başarılı") ? colors.success : colors.error,
                marginBottom: '1.5rem',
                fontWeight: '500'
              }}>
                {message}
              </div>
            )}
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              {/* Profil bilgi kartları */}
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
            
            <div style={{
              marginTop: '2.5rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button style={{
                backgroundColor: colors.primary,
                color: '#fff',
                padding: '1rem 2.5rem',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(230, 126, 34, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(230, 126, 34, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(230, 126, 34, 0.2)';
              }}>
                PROFİLİ DÜZENLE
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
                boxShadow: '0 8px 20px rgba(230, 126, 34, 0.2)',
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
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="white"/>
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
                boxShadow: '0 8px 20px rgba(230, 126, 34, 0.2)',
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
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="white"/>
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
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={colors.primary}/>
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
      
      {/* CSS Animasyonları */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Profile; 