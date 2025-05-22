import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchCars, getCarFilterOptions, API_BASE_URL } from '../api';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaFilter, FaSort, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useState({
    brand: '',
    year: '',
    carType: ''
  });

  const [offices] = useState([
    'İstanbul Havalimanı',
    'Ankara Esenboğa',
    'İzmir Adnan Menderes',
    'Antalya Havalimanı',
    'Bodrum Havalimanı'
  ]);
  
  const [cars, setCars] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    carTypes: [],
    years: []
  });
  const [accordion, setAccordion] = useState({
    brand: true,
    year: true,
    carType: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await getCarFilterOptions();
        console.log('Filter Options:', options);
        setFilterOptions({
          brands: options.brands || [],
          carTypes: options.carTypes || [],
          years: options.years || []
        });
      } catch (error) {
        console.error('Filtre seçenekleri yüklenemedi:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccordion = (key) => {
    setAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchError(null);
    
    try {
      const results = await searchCars({
        brand: searchParams.brand,
        year: searchParams.year,
        carType: searchParams.carType
      });
      setCars(results.cars);
      
      if (results.cars.length === 0) {
        setSearchError('Belirtilen kriterlere uygun araç bulunamadı.');
      }
    } catch (error) {
      setSearchError('Araç arama sırasında bir hata oluştu.');
      console.error('Araç arama hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/road-background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '50px',
      color: '#fff'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
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
    subtitle: {
      fontSize: '2rem',
      fontWeight: '300',
      marginBottom: '2rem',
      color: '#fff'
    },
    searchBox: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '20px',
      width: '90%',
      maxWidth: '500px',
      marginBottom: '40px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
    },
    inputGroup: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    inputWrapper: {
      flex: '1 1 120px',
      position: 'relative',
      minWidth: '120px'
    },
    input: {
      width: '100%',
      padding: '10px 10px 10px 15px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '15px',
      transition: 'all 0.3s ease'
    },
    searchButton: {
      backgroundColor: '#FF5722',
      color: '#fff',
      border: 'none',
      padding: '12px 0',
      borderRadius: '8px',
      fontSize: '17px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '10px'
    },
    carGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
      width: '90%',
      maxWidth: '1200px',
      margin: '50px auto'
    },
    carCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '20px',
      transition: 'all 0.3s ease'
    },
    section: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: '12px',
      padding: '30px',
      margin: '30px 0',
      width: '90%',
      maxWidth: '900px',
      color: '#fff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: '700',
      marginBottom: '15px',
      color: '#FF5722'
    },
    sectionText: {
      fontSize: '1.1rem',
      fontWeight: '400',
      marginBottom: '10px'
    },
    testimonial: {
      fontStyle: 'italic',
      color: '#ffe082',
      marginBottom: '10px'
    },
    testimonialAuthor: {
      fontWeight: 'bold',
      color: '#fffde7'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          TECHSAN<br/>Rent A Car
        </h1>
        <h2 style={styles.subtitle}>Lüks Araç Kiralama Hizmeti</h2>
      </div>

      <div style={styles.searchBox}>
        <form onSubmit={handleSearch}>
          {/* Marka */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleAccordion('brand')}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>Marka</span>
              {accordion.brand ? <FaChevronUp style={{ marginLeft: 8 }} /> : <FaChevronDown style={{ marginLeft: 8 }} />}
            </div>
            {accordion.brand && (
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <select
                    name="brand"
                    value={searchParams.brand}
                    onChange={handleSearchParamChange}
                    style={styles.input}
                  >
                    <option value="">Tümü</option>
                    {(filterOptions.brands || []).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          {/* Yıl */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleAccordion('year')}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>Yıl</span>
              {accordion.year ? <FaChevronUp style={{ marginLeft: 8 }} /> : <FaChevronDown style={{ marginLeft: 8 }} />}
            </div>
            {accordion.year && (
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <select
                    name="year"
                    value={searchParams.year}
                    onChange={handleSearchParamChange}
                    style={styles.input}
                  >
                    <option value="">Tümü</option>
                    {(filterOptions.years || []).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          {/* Araç Türü */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleAccordion('carType')}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>Araç Türü</span>
              {accordion.carType ? <FaChevronUp style={{ marginLeft: 8 }} /> : <FaChevronDown style={{ marginLeft: 8 }} />}
            </div>
            {accordion.carType && (
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <select
                    name="carType"
                    value={searchParams.carType}
                    onChange={handleSearchParamChange}
                    style={styles.input}
                  >
                    <option value="">Tümü</option>
                    {(filterOptions.carTypes || []).map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            style={styles.searchButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FF7043'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5722'}
          >
            <FaSearch style={{ marginRight: '10px' }} />
            Araç Ara
          </button>
        </form>

        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}>
            Araçlar yükleniyor...
          </div>
        )}

        {searchError && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#ff6b6b' }}>
            {searchError}
          </div>
        )}
      </div>

      {cars.length > 0 && (
        <div style={styles.carGrid}>
          {cars.map(car => (
            <div 
              key={car.id} 
              style={styles.carCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img 
                src={car.image ? API_BASE_URL + car.image : '/images/default-car.jpg'} 
                alt={`${car.brand} ${car.model}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}
              />
              <h3>{car.brand} {car.model}</h3>
              <p>Yıl: {car.year}</p>
              <p>Araç Türü: {car.carType}</p>
              <p>Günlük Fiyat: {car.dailyPrice} TL</p>
              <Link to={`/cars/${car.id}`}>
                <button
                  style={{
                    backgroundColor: '#FF5722',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#FF7043'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5722'}
                >
                  Detaylar
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
