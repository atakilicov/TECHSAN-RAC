import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link }from 'react-router-dom';
import { getCarDetails, API_BASE_URL } from '../api';
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft, FaCalendarAlt, FaCar, FaCogs, FaGasPump, FaPalette, FaUsers, FaIdCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { m } from 'framer-motion';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const data = await getCarDetails(id);
        setCar(data);
        setError(null);
      } catch (err) {
        setError('Araç detayları yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181c 0%, #23232b 100%)',
      color: '#fff',
      padding: '32px 8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    card: {
      width: '100%',
      maxWidth: '500px',
      background: 'rgba(30, 30, 34, 0.98)',
      borderRadius: '22px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      overflow: 'hidden',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    imageContainer: {
      width: '100%',
      aspectRatio: '16/9',
      background: '#222',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    },
    carImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transition: 'transform 0.3s',
    },
    infoContainer: {
      padding: '28px 22px 18px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#fff',
      fontFamily: 'Playfair Display, serif',
      margin: 0,
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      background: 'rgba(244, 67, 54, 0.13)',
      color: '#FF5252',
      border: '1px solid rgba(244, 67, 54, 0.2)',
    },
    availableStatus: {
      background: 'rgba(52, 168, 83, 0.13)',
      color: '#4CAF50',
      border: '1px solid rgba(76, 175, 80, 0.2)',
    },
    price: {
      fontSize: '1.5rem',
      color: '#fff',
      fontWeight: '700',
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '8px',
      padding: '8px 18px',
      alignSelf: 'flex-end',
      marginTop: '-38px',
      marginBottom: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    detailCard: {
      background: 'rgba(255,255,255,0.04)',
      padding: '10px 12px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      color: '#fff',
    },
    detailIcon: {
      fontSize: '16px',
      color: '#bbb',
    },
    detailInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    detailLabel: {
      fontSize: '11px',
      color: '#aaa',
      marginBottom: '1px',
    },
    detailValue: {
      fontSize: '14px',
      color: '#fff',
      fontWeight: '500',
    },
    description: {
      background: 'rgba(255,255,255,0.04)',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#eee',
      marginTop: '6px',
    },
    reserveButton: {
      display: 'block',
      background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
      color: '#fff',
      padding: '14px',
      borderRadius: '10px',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '600',
      textAlign: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginTop: '10px',
      letterSpacing: '0.5px',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(76, 175, 80, 0.2)',
      },
    },
    disabledButton: {
      background: 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)',
      cursor: 'not-allowed',
      opacity: '0.8',
      '&:hover': {
        transform: 'none',
        boxShadow: 'none',
      },
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      gap: '20px',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '40px',
      background: 'rgba(244, 67, 54, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(244, 67, 54, 0.2)',
      maxWidth: '600px',
      margin: '0 auto',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <FaCar size={40} color="#8B0000" />
          </m.div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2>{error || 'Araç bulunamadı.'}</h2>
          <Link to="/" style={styles.backLink}>
            <FaArrowLeft style={{ marginRight: '8px' }} /> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = car.status === 'available';

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        <FaArrowLeft style={{ marginRight: '8px' }} /> Ana Sayfaya Dön
      </Link>
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img 
            src={car.image ? `${API_BASE_URL}${car.image}` : '/images/default-car.jpg'} 
            alt={`${car.brand} ${car.model}`} 
            style={styles.carImage}
          />
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.header}>
            <h1 style={styles.title}>{car.brand} {car.model}</h1>
            <div 
              style={{
                ...styles.statusBadge,
                ...(isAvailable ? styles.availableStatus : {}),
              }}
            >
              {isAvailable ? (
                <>
                  <FaCheckCircle /> Kiralamaya Uygun
                </>
              ) : (
                <>
                  <FaTimesCircle /> Şu Anda Kiralık
                </>
              )}
            </div>
          </div>
          <div style={styles.price}>
            {Number(car.daily_price).toLocaleString('tr-TR')} TL/gün
          </div>
          <div style={styles.detailsGrid}>
            <div style={styles.detailCard}>
              <FaCalendarAlt style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Model Yılı</span>
                <span style={styles.detailValue}>{car.year}</span>
              </div>
            </div>
            <div style={styles.detailCard}>
              <FaCar style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Araç Tipi</span>
                <span style={styles.detailValue}>{car.car_type}</span>
              </div>
            </div>
            <div style={styles.detailCard}>
              <FaCogs style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Şanzıman</span>
                <span style={styles.detailValue}>{car.transmission}</span>
              </div>
            </div>
            <div style={styles.detailCard}>
              <FaGasPump style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Yakıt Türü</span>
                <span style={styles.detailValue}>{car.fuel_type}</span>
              </div>
            </div>
            <div style={styles.detailCard}>
              <FaPalette style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Renk</span>
                <span style={styles.detailValue}>{car.color || 'Belirtilmemiş'}</span>
              </div>
            </div>
            <div style={styles.detailCard}>
              <FaUsers style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Koltuk Sayısı</span>
                <span style={styles.detailValue}>{car.seat_count || 'Belirtilmemiş'}</span>
              </div>
            </div>
            <div style={styles.detailCard}>
              <FaIdCard style={styles.detailIcon} />
              <div style={styles.detailInfo}>
                <span style={styles.detailLabel}>Plaka</span>
                <span style={styles.detailValue}>{car.plate_number}</span>
              </div>
            </div>
          </div>
          {car.description && (
            <div style={styles.description}>
              <strong>Araç Hakkında:</strong> {car.description}
            </div>
          )}
          {isAuthenticated && (
            <div>
              {isAvailable ? (
                <Link to={`/reservation/${car.id}`} style={styles.reserveButton}>
                  Hemen Kirala
                </Link>
              ) : (
                <div style={{...styles.reserveButton, ...styles.disabledButton}}>
                  Araç Şu Anda Kiralık
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetail; 