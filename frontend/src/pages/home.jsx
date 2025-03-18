import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Stil tanımlamaları
  const styles = {
    heroContainer: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/Rollsroyce.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: 'rgba(10, 10, 10, 0.35)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      borderRadius: '20px',
      padding: '3.5rem',
      boxShadow: '0 10px 50px 0 rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transform: 'translateY(0)',
      opacity: 1,
      animation: 'fadeInUp 0.8s ease-out',
      zIndex: 2
    },
    mainTitle: {
      fontSize: '4rem',
      fontWeight: '800',
      marginBottom: '1rem',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      backgroundImage: 'linear-gradient(135deg, #fff, #6D213C)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 5px 15px rgba(0,0,0,0.2)'
    },
    titleSpan: {
      display: 'block',
      fontSize: '2.2rem',
      fontWeight: '500',
      marginTop: '0.5rem',
      color: '#6D213C',
      letterSpacing: '1px',
      WebkitTextFillColor: '#6D213C'
    },
    subtitle: {
      fontSize: '1.8rem',
      fontWeight: '300',
      marginBottom: '2rem',
      letterSpacing: '1px',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    badge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, rgba(109, 33, 60, 0.2) 0%, rgba(48, 10, 16, 0.3) 100%)',
      color: '#6D213C',
      padding: '0.9rem 2.2rem',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      border: '1px solid rgba(109, 33, 60, 0.5)',
      marginTop: '1.5rem',
      boxShadow: '0 5px 15px rgba(48, 10, 16, 0.15)',
      transition: 'all 0.3s ease',
      animation: 'pulse 2s infinite'
    },
    ctaButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      marginTop: '3rem',
      flexWrap: 'wrap'
    },
    primaryBtn: {
      backgroundColor: '#800020',
      color: '#fff',
      padding: '1.2rem 2.5rem',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.1rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      border: 'none',
      boxShadow: '0 8px 25px rgba(128, 0, 32, 0.35)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 30px rgba(128, 0, 32, 0.5)'
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent)',
        zIndex: -1
      }
    },
    secondaryBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      color: '#fff',
      padding: '1.2rem 2.5rem',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.1rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.25)'
      }
    },
    featuresSection: {
      padding: '7rem 2rem',
      background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    featureCard: {
      flex: 1,
      minWidth: '280px',
      maxWidth: '350px',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '2.5rem 2rem',
      textAlign: 'center',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.06)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.03)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)'
      }
    },
    featureIcon: {
      width: '70px',
      height: '70px',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'rgba(109, 33, 60, 0.1)',
      color: '#6D213C'
    },
    featureTitle: {
      fontSize: '1.6rem',
      fontWeight: '600',
      color: '#333',
      margin: '1rem 0 1rem',
      position: 'relative',
      paddingBottom: '1rem',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40px',
        height: '3px',
        backgroundColor: '#6D213C',
        borderRadius: '2px'
      }
    },
    featureDesc: {
      color: '#666',
      fontSize: '1.05rem',
      lineHeight: '1.6',
      marginBottom: '1rem'
    },
    closingSection: {
      padding: '8rem 2rem',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/Rollsroyce.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      textAlign: 'center',
      color: '#fff',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '2.8rem',
      fontWeight: '700',
      marginBottom: '2rem',
      position: 'relative',
      display: 'inline-block',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '4px',
        borderRadius: '2px',
        backgroundColor: '#6D213C'
      }
    },
    bigTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '1.5rem',
      letterSpacing: '1px',
      textShadow: '0 3px 10px rgba(0,0,0,0.3)',
      animation: 'fadeIn 1s ease-out'
    }
  };

  return (
    <div className="home-page">
      {/* Hero Bölümü */}
      <div style={styles.heroContainer}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            TECHSAN<span style={styles.titleSpan}>Rent A Car</span>
          </h1>
          <h2 style={styles.subtitle}>Lüks Araç Kiralama Hizmeti</h2>
          
          <div style={{margin: '2.5rem 0'}}>
            <p style={{
              fontSize: '1.5rem', 
              marginBottom: '1rem', 
              lineHeight: '1.6',
              fontWeight: '300',
              textShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              Rolls Royce ve daha fazlası...
            </p>
            <div style={styles.badge}>Çok Yakında Hizmetinizde</div>
          </div>

          <div style={styles.ctaButtons}>
            <Link to="/register" style={{
              ...styles.primaryBtn,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              transform: 'translateY(0)',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 30px rgba(128, 0, 32, 0.5)'
              },
              background: 'linear-gradient(135deg, #6D213C, #300A10)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(128, 0, 32, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(128, 0, 32, 0.35)';
            }}>
              Hemen Üye Ol
            </Link>
            <Link to="/login" style={{
              ...styles.secondaryBtn,
              transition: 'all 0.4s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            }}>
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>

      {/* Özellikler Bölümü */}
      <div style={styles.featuresSection}>
        <h2 style={{
          fontSize: '2.6rem', 
          fontWeight: '700', 
          marginBottom: '3.5rem',
          position: 'relative',
          display: 'inline-block',
          color: '#333'
        }}>
          Premium Hizmetlerimiz
          <span style={{
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            backgroundColor: '#6D213C',
            borderRadius: '2px'
          }}></span>
        </h2>
        
        <div style={{
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '2.5rem', 
          maxWidth: '1200px', 
          margin: '0 auto'
        }}>
          {/* Özellik Kartları */}
          {[
            {
              title: 'Lüks Araç Filosu',
              desc: 'En prestijli markalardan oluşan geniş araç yelpazemiz ile size özel seçenekler sunuyoruz.',
              icon: 'M17 5.5v9L12 18l-5-3.5v-9h10m0-2H7c-1.1 0-2 .9-2 2v9c0 .55.22 1.05.59 1.41l5 5c.55.55 1.45.55 2 0l5-5c.37-.36.59-.86.59-1.41v-9c0-1.1-.9-2-2-2zM12 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'
            },
            {
              title: '7/24 Hizmet',
              desc: 'Dilediğiniz saatte, nerede olursanız olun size özel hizmet sunuyoruz.',
              icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'
            },
            {
              title: 'Özel Şoför',
              desc: 'Profesyonel sürücülerimiz ile VIP deneyim yaşayın.',
              icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              ...styles.featureCard
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.06)';
            }}>
              <div style={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d={feature.icon} />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kapanış CTA Bölümü */}
      <div style={{
        ...styles.closingSection,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/Rollsroyce.jpeg')`
      }}>
        <h2 style={styles.bigTitle}>
          Lüks Araç Kiralama Deneyimi İçin
        </h2>
        <p style={{
          fontSize: '1.4rem', 
          maxWidth: '750px', 
          margin: '0 auto 3.5rem', 
          lineHeight: '1.7',
          fontWeight: '300',
          opacity: '0.9'
        }}>
          Çok yakında hizmetinizdeyiz. Şimdiden üye olarak avantajlardan yararlanmaya başlayın.
        </p>
        <Link to="/register" style={{
          ...styles.primaryBtn,
          padding: '1.3rem 3.5rem',
          fontSize: '1.2rem',
          boxShadow: '0 10px 30px rgba(128, 0, 32, 0.5)',
          transition: 'all 0.4s ease',
          background: 'linear-gradient(135deg, #6D213C, #300A10)',
          transform: 'translateY(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(128, 0, 32, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(128, 0, 32, 0.5)';
        }}>
          Hemen Kayıt Ol
        </Link>
      </div>

      {/* CSS Animasyonları */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home; 