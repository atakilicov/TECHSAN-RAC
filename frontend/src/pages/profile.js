import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="course-register-container">
        <div className="course-register-right" style={{flex: "1"}}>
          <div className="register-form">
            <div className="register-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#7D5A3C"/>
              </svg>
            </div>
            <h3>PROFİL SAYFASI</h3>
            <p className="register-alert-error">Lütfen giriş yapın.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-register-container">
      <div className="course-register-left">
        <div className="gradient-overlay"></div>
        <div className="register-info">
          <div className="graduation-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#FFFFFF"/>
            </svg>
          </div>
          <h2>{user.first_name} {user.last_name}</h2>
          <p>Kurs profil bilgilerinizi bu sayfadan görüntüleyebilir ve düzenleyebilirsiniz. Kişisel bilgilerinizin doğruluğu, sistem içerisindeki deneyiminizi olumlu etkileyecektir.</p>
          <div className="register-buttons">
            <button className="register-btn-outline">Kurslarım</button>
            <button className="register-btn-primary">Ayarlar</button>
          </div>
        </div>
      </div>
      
      <div className="course-register-right">
        <div className="register-form profile-form">
          <div className="register-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#7D5A3C"/>
            </svg>
          </div>
          <h3>PROFİL BİLGİLERİ</h3>
          
          {message && <p className={message.includes("başarılı") ? "register-alert-success" : "register-alert-error"}>{message}</p>}
          
          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-avatar">
                  <span>{user.first_name?.[0]}{user.last_name?.[0]}</span>
                </div>
                <div className="profile-title">
                  <h4>{user.first_name} {user.last_name}</h4>
                  <p className="profile-subtitle">{user.email}</p>
                </div>
              </div>
              
              <div className="profile-data">
                <div className="profile-data-item">
                  <div className="profile-data-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM19 12H21C21 7 17 3 12 3V5C15.9 5 19 8.1 19 12ZM15 12H17C17 9.2 14.8 7 12 7V9C13.7 9 15 10.3 15 12Z" fill="#7D5A3C"/>
                    </svg>
                  </div>
                  <div className="profile-data-content">
                    <span className="profile-data-label">Telefon</span>
                    <span className="profile-data-value">{user.phone || "Belirtilmemiş"}</span>
                  </div>
                </div>
                
                <div className="profile-data-item">
                  <div className="profile-data-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#7D5A3C"/>
                    </svg>
                  </div>
                  <div className="profile-data-content">
                    <span className="profile-data-label">Adres</span>
                    <span className="profile-data-value">{user.address || "Belirtilmemiş"}</span>
                  </div>
                </div>
                
                <div className="profile-data-item">
                  <div className="profile-data-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 11V5L12 2L9 5V7H3V21H21V11H15ZM7 19H5V17H7V19ZM7 15H5V13H7V15ZM7 11H5V9H7V11ZM13 19H11V17H13V19ZM13 15H11V13H13V15ZM13 11H11V9H13V11ZM13 7H11V5H13V7ZM19 19H17V17H19V19ZM19 15H17V13H19V15Z" fill="#7D5A3C"/>
                    </svg>
                  </div>
                  <div className="profile-data-content">
                    <span className="profile-data-label">Şehir</span>
                    <span className="profile-data-value">{user.city || "Belirtilmemiş"}</span>
                  </div>
                </div>
                
                <div className="profile-data-item">
                  <div className="profile-data-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="#7D5A3C"/>
                    </svg>
                  </div>
                  <div className="profile-data-content">
                    <span className="profile-data-label">Doğum Tarihi</span>
                    <span className="profile-data-value">{user.birth_date ? new Date(user.birth_date).toLocaleDateString('tr-TR') : "Belirtilmemiş"}</span>
                  </div>
                </div>
              </div>
              
              <button className="register-btn-submit">PROFİLİ DÜZENLE</button>
            </div>
            
            <div className="profile-card">
              <h3 className="profile-section-title">Kurs Bilgilerim</h3>
              <div className="profile-course-list">
                <div className="profile-course-item">
                  <div className="profile-course-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="#7D5A3C"/>
                    </svg>
                  </div>
                  <div className="profile-course-content">
                    <h4>Temel Sürüş Eğitimi</h4>
                    <p>Araç kullanımına yeni başlayanlar için temel eğitim</p>
                    <div className="profile-course-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: "75%"}}></div>
                      </div>
                      <span>75% Tamamlandı</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 