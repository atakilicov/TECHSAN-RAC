import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile, changePassword } from "../api";
import "../styles/Profile.css";

// Profil Sayfası
// - Kullanıcı bilgilerini göster
// - Profil bilgilerini güncelleme formu
// - Şifre değiştirme formu
// - Kullanıcının kiralama geçmişi

const Profile = () => {
  // State tanımlamaları
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  
  // API'den kullanıcı verilerini yükleme
  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("Profil yüklenirken hata oluştu:", error);
      });
  }, []);
  
  
  // Profil güncelleme işlevi
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profileData);
      setMessage("Profil güncellendi!");
    } catch (error) {
      setMessage("Güncelleme başarısız.");
    }
  };
  
  // Şifre değiştirme işlevi
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await changePassword(newPassword);
      setMessage("Şifre başarıyla değiştirildi.");
    } catch (error) {
      setMessage("Şifre değiştirme başarısız.");
    }
  };
  
  // JSX return
  return (
    <div className="profile-container">
      <h2>Profilim</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleProfileUpdate}>
        <input
          type="text"
          value={profileData.username}
          onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
          placeholder="Kullanıcı Adı"
        />
        <input
          type="email"
          value={profileData.email}
          readOnly
          placeholder="E-posta"
        />
        <button type="submit">Profili Güncelle</button>
      </form>

      <h3>Şifre Değiştir</h3>
      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Yeni Şifre"
        />
        <button type="submit">Şifreyi Güncelle</button>
      </form>
    </div>
  );
};

export default Profile;
