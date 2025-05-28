import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchCars, getCarFilterOptions, API_BASE_URL } from '../api';
import { m, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaFilter, FaCar, FaCogs, FaGasPump } from 'react-icons/fa';

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

const fuelTypes = [
  { value: '', label: 'Tüm Yakıt Tipleri' },
  { value: 'gasoline', label: 'Benzin' },
  { value: 'diesel', label: 'Dizel' },
  { value: 'hybrid', label: 'Hibrit' },
  { value: 'electric', label: 'Elektrik' },
  { value: 'lpg', label: 'LPG' }
];

const Home = () => {
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    year: '',
    car_type: '',
    transmission: '',
    fuel_type: '',
    start_date: '',
    end_date: ''
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
    years: [],
    transmissionTypes: [],
    fuelTypes: []
  });
  const [accordion, setAccordion] = useState({
    brand: true,
    year: true,
    carType: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [transmissionTypes] = useState([
    { value: 'manual', label: 'Manuel' },
    { value: 'automatic', label: 'Otomatik' }
  ]);

  const [fuelTypes] = useState([
    { value: '', label: 'Tüm Yakıt Tipleri' },
    { value: 'gasoline', label: 'Benzin' },
    { value: 'diesel', label: 'Dizel' },
    { value: 'hybrid', label: 'Hibrit' },
    { value: 'electric', label: 'Elektrik' },
    { value: 'lpg', label: 'LPG' }
  ]);

  const [modelOptions, setModelOptions] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await getCarFilterOptions();
        console.log('Filter Options:', options);
        setFilterOptions({
          brands: options.brands || [],
          carTypes: options.car_types || [],
          years: options.years || [],
          transmissionTypes: options.transmission_types || transmissionTypes,
          fuelTypes: options.fuel_types || fuelTypes
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
    if (name === 'brand') {
      const selectedBrand = popularBrands.find(b => b.value === value);
      setModelOptions(selectedBrand ? selectedBrand.models : []);
      setSearchParams(prev => ({ ...prev, model: '' }));
    }
  };

  const handleAccordion = (key) => {
    setAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchError(null);
    
    try {
      // URL parametrelerini oluştur
      const queryParams = new URLSearchParams();
      
      // Parametreleri ekle (sadece değeri olanları)
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      
      console.log('Arama parametreleri:', Object.fromEntries(queryParams)); // Debug için
      const results = await searchCars(Object.fromEntries(queryParams));
      
      console.log('API yanıtı:', results); // Debug için
      
      let carsArr = results && results.cars ? results.cars : [];
      // Sıralama uygula
      if (sortBy) {
        carsArr = [...carsArr];
        if (sortBy === 'year-asc') carsArr.sort((a, b) => a.year - b.year);
        if (sortBy === 'year-desc') carsArr.sort((a, b) => b.year - a.year);
        if (sortBy === 'brand-asc') carsArr.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
        if (sortBy === 'brand-desc') carsArr.sort((a, b) => (b.brand || '').localeCompare(a.brand || ''));
        if (sortBy === 'price-asc') carsArr.sort((a, b) => (a.daily_price || 0) - (b.daily_price || 0));
        if (sortBy === 'price-desc') carsArr.sort((a, b) => (b.daily_price || 0) - (a.daily_price || 0));
      }
      
      setCars(carsArr);
      if (carsArr.length === 0) {
        setSearchError('Belirtilen kriterlere uygun araç bulunamadı.');
      }
    } catch (error) {
      console.error('Araç arama hatası:', error);
      setSearchError('Araç arama sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
    },
    hero: {
      height: '75vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0 20px',
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.0) 85%), url("/images/Rollsroyce.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 0,
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1200px',
      width: '100%',
      textAlign: 'center',
      marginTop: '-50px',
    },
    title: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontFamily: 'Playfair Display, serif',
      fontWeight: '700',
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #8B0000 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 5px 15px rgba(0,0,0,0.2)',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
      fontWeight: '300',
      marginBottom: '2rem',
      color: '#F4F6F8',
      maxWidth: '800px',
      margin: '0 auto 2rem',
    },
    searchBox: {
      background: 'rgba(20, 20, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      border: 'none',
    },
    filterGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '15px',
    },
    filterLabel: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      color: '#fff',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    searchButton: {
      background: '#222',
      color: '#fff',
      border: 'none',
      padding: '15px 40px',
      borderRadius: '10px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
    carGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      padding: '20px',
      maxWidth: '1200px',
      margin: '20px auto 0',
      position: 'relative',
      zIndex: 2,
    },
    carCard: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(139, 0, 0, 0.1)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(139, 0, 0, 0.15)',
        borderColor: '#8B0000',
      },
    },
    carImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '15px 15px 0 0',
    },
    carInfo: {
      padding: '15px',
      background: 'transparent',
    },
    carTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#8B0000',
    },
    carDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px',
      marginBottom: '15px',
      color: '#333',
    },
    carDetailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '13px',
      color: '#555',
      '& svg': {
        color: '#8B0000',
        fontSize: '14px',
      },
    },
    carPrice: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#8B0000',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderTop: '1px solid rgba(139, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(139, 0, 0, 0.1)',
    },
    priceLabel: {
      fontSize: '13px',
      color: '#666',
    },
    detailsButton: {
      background: '#8B0000',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      border: 'none',
      '&:hover': {
        background: '#6d0000',
      },
    },
  };

  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <section style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContent}>
          <m.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={styles.title}
          >
            TECHSAN Premium Car Rental
          </m.h1>
          <m.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.subtitle}
          >
            Lüks ve konforun kusursuz birleşimi ile unutulmaz sürüş deneyimi
          </m.p>

          <m.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={styles.searchBox}
          >
            <form onSubmit={handleSearch}>
              <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ ...styles.select, maxWidth: 220 }}>
                  <option value="">Sıralama Yok</option>
                  <option value="year-asc">Yıl (Artan)</option>
                  <option value="year-desc">Yıl (Azalan)</option>
                  <option value="brand-asc">Marka (A-Z)</option>
                  <option value="brand-desc">Marka (Z-A)</option>
                  <option value="price-asc">Fiyat (Artan)</option>
                  <option value="price-desc">Fiyat (Azalan)</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <div>
                  <div style={styles.filterLabel}>Başlangıç Tarihi</div>
                  <input type="date" name="start_date" value={searchParams.start_date} onChange={handleSearchParamChange} style={{ ...styles.select, padding: '10px 12px' }} />
                </div>
                <div>
                  <div style={styles.filterLabel}>Bitiş Tarihi</div>
                  <input type="date" name="end_date" value={searchParams.end_date} onChange={handleSearchParamChange} style={{ ...styles.select, padding: '10px 12px' }} />
                </div>
              </div>
              <div style={styles.filterGroup}>
                <div>
                  <div style={styles.filterLabel}>
                    <FaCar style={{ marginRight: '8px' }} /> Marka
                  </div>
                  <select
                    name="brand"
                    value={searchParams.brand}
                    onChange={handleSearchParamChange}
                    style={styles.select}
                  >
                    <option value="">Tüm Markalar</option>
                    {(filterOptions.brands || []).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={styles.filterLabel}>
                    <FaCalendarAlt style={{ marginRight: '8px' }} /> Model Yılı
                  </div>
                  <select
                    name="year"
                    value={searchParams.year}
                    onChange={handleSearchParamChange}
                    style={styles.select}
                  >
                    <option value="">Tüm Yıllar</option>
                    {(filterOptions.years || []).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={styles.filterLabel}>
                    <FaCar style={{ marginRight: '8px' }} /> Model
                  </div>
                  <select
                    name="model"
                    value={searchParams.model}
                    onChange={handleSearchParamChange}
                    style={styles.select}
                    disabled={!modelOptions.length}
                  >
                    <option value="">Tüm Modeller</option>
                    {modelOptions.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={styles.filterLabel}>
                    <FaCogs style={{ marginRight: '8px' }} /> Araç Tipi
                  </div>
                  <select
                    name="car_type"
                    value={searchParams.car_type}
                    onChange={handleSearchParamChange}
                    style={styles.select}
                  >
                    <option value="">Tüm Tipler</option>
                    {(filterOptions.carTypes || []).map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterSection}>
                  <label style={styles.label}>Vites Tipi</label>
                  <select
                    name="transmission"
                    value={searchParams.transmission}
                    onChange={handleSearchParamChange}
                    style={styles.select}
                  >
                    <option value="">Tüm Vites Tipleri</option>
                    {(filterOptions.transmissionTypes || transmissionTypes).map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterSection}>
                  <label style={styles.label}>Yakıt Tipi</label>
                  <select
                    name="fuel_type"
                    value={searchParams.fuel_type}
                    onChange={handleSearchParamChange}
                    style={styles.select}
                  >
                    <option value="">Tüm Yakıt Tipleri</option>
                    {(filterOptions.fuelTypes || fuelTypes).map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={styles.searchButton}
              >
                <FaSearch size={20} />
                Araç Ara
              </m.button>
            </form>
          </m.div>
        </div>
      </section>

      <AnimatePresence>
        {cars.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={styles.carGrid}
          >
            {cars.map((car, index) => (
              <m.div
                key={car.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={styles.carCard}
              >
                <img
                  src={car.image ? `${API_BASE_URL}${car.image}` : '/images/default-car.jpg'}
                  alt={`${car.brand} ${car.model}`}
                  style={styles.carImage}
                />
                <div style={styles.carInfo}>
                  <h3 style={styles.carTitle}>{car.brand} {car.model}</h3>
                  <div style={styles.carDetails}>
                    <div style={styles.carDetailItem}>
                      <FaCalendarAlt />
                      <span>Yıl: {car.year || 'Belirtilmemiş'}</span>
                    </div>
                    <div style={styles.carDetailItem}>
                      <FaCar />
                      <span>Tip: {car.car_type || car.carType || 'Belirtilmemiş'}</span>
                    </div>
                    <div style={styles.carDetailItem}>
                      <FaCogs />
                      <span>Vites: {
                        (filterOptions.transmissionTypes || transmissionTypes).find(t => t.value === car.transmission)?.label || 'Belirtilmemiş'
                      }</span>
                    </div>
                    <div style={styles.carDetailItem}>
                      <FaGasPump />
                      <span>Yakıt: {car.fuel_type || car.fuelType || 'Belirtilmemiş'}</span>
                    </div>
                  </div>
                  <div style={styles.carPrice}>
                    <span style={styles.priceLabel}>Günlük Fiyat</span>
                    <span>{car.daily_price ? `${Number(car.daily_price).toLocaleString('tr-TR')} TL` : 'Belirtilmemiş'}</span>
                  </div>
                  <Link to={`/cars/${car.id}`}>
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={styles.detailsButton}
                    >
                      Detayları Gör
                    </m.button>
                  </Link>
                </div>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#8B0000' }}>
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <FaSearch size={40} />
          </m.div>
          <p style={{ marginTop: '20px' }}>Araçlar Yükleniyor...</p>
        </div>
      )}

      {searchError && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            padding: '20px',
            margin: '20px auto',
            maxWidth: '600px',
            background: 'rgba(139, 0, 0, 0.1)',
            borderRadius: '10px',
            color: '#ff6b6b'
          }}
        >
          {searchError}
        </m.div>
      )}
    </m.div>
  );
};

export default Home;
