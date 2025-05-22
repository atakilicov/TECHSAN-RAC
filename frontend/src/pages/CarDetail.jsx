import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link }from 'react-router-dom';
import { getCarDetails, API_BASE_URL } from '../api';
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

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
      padding: '40px 20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: '"Roboto", sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9',
      minHeight: 'calc(100vh - 80px)'
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#555',
      marginBottom: '30px',
      fontSize: '16px',
      transition: 'color 0.3s ease'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      fontSize: '20px',
      color: '#555'
    },
    errorContainer: {
      textAlign: 'center',
      padding: '30px',
      backgroundColor: '#ffebee',
      color: '#c62828',
      borderRadius: '8px',
      border: '1px solid #ef9a9a'
    },
    carGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '30px',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    imageContainer: {
      textAlign: 'center'
    },
    carImage: {
      maxWidth: '100%',
      maxHeight: '450px',
      objectFit: 'cover',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    carInfo: {
      paddingLeft: '0px'
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#FF5722', // Ana renk turuncu
      marginBottom: '15px',
      borderBottom: '2px solid #FFDEAD', // Açık turuncu alt çizgi
      paddingBottom: '10px'
    },
    detailItem: {
      fontSize: '18px',
      marginBottom: '12px',
      color: '#444',
      display: 'flex',
      alignItems: 'center'
    },
    detailLabel: {
      fontWeight: '600',
      minWidth: '130px',
      marginRight: '10px',
      color: '#222'
    },
    price: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#FF5722',
      marginTop: '25px',
      marginBottom: '25px'
    },
    description: {
      fontSize: '17px',
      lineHeight: '1.7',
      color: '#555',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #eee'
    },
    reserveButton: {
      backgroundColor: '#FF5722',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginTop: '20px',
      display: 'block',
      width: '100%',
      textAlign: 'center',
      textDecoration: 'none'
    }
  };

  if (loading) {
    return <div style={styles.loadingContainer}>Araç detayları yükleniyor...</div>;
  }

  if (error) {
    return <div style={styles.container}><div style={styles.errorContainer}>{error}</div></div>;
  }

  if (!car) {
    return <div style={styles.container}><div style={styles.errorContainer}>Araç bulunamadı.</div></div>;
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        <FaArrowLeft style={{ marginRight: '8px' }} /> Ana Sayfaya Dön
      </Link>
      <div style={styles.carGrid}>
        <div style={styles.imageContainer}>
          <img 
            src={car.image ? `${API_BASE_URL}${car.image}` : '/images/default-car.jpg'} 
            alt={`${car.brand} ${car.model}`} 
            style={styles.carImage} 
          />
        </div>
        <div style={styles.carInfo}>
          <h1 style={styles.title}>{car.brand} {car.model}</h1>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Yıl:</span> {car.year}</div>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Renk:</span> {car.color || 'Belirtilmemiş'}</div>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Koltuk Sayısı:</span> {car.seat_count || 'Belirtilmemiş'}</div>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Araç Tipi:</span> {car.car_type}</div>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Şanzıman:</span> {car.transmission}</div>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Yakıt Türü:</span> {car.fuel_type}</div>
          <div style={styles.detailItem}><span style={styles.detailLabel}>Plaka:</span> {car.plate_number}</div>
          
          <div style={styles.price}>{parseFloat(car.daily_price).toFixed(2)} TL/gün</div>
          
          {car.description && (
            <div style={styles.description}>
              <h3 style={{color: '#333', marginBottom: '10px'}}>Açıklama</h3>
              <p>{car.description}</p>
            </div>
          )}

          {isAuthenticated ? (
            <Link to={`/reservation/${car.id}`} style={styles.reserveButton}>
              Şimdi Kirala
            </Link>
          ) : (
            <Link to="/login" style={styles.reserveButton}>
              Kiralamak için Giriş Yapın
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetail; 