# TECHSAN Araç Kiralama Projesi

Bu proje, **SOFT3112.1 Software Development Practice** dersi kapsamında geliştirilmiş bir araç kiralama web uygulamasıdır. Proje, **2 sprint** halinde tamamlanmış olup, modern yazılım geliştirme pratiklerini uygulayarak gerçek dünya senaryolarına uygun bir çözüm sunmaktadır.

## Proje Hakkında

TECHSAN Araç Kiralama sistemi, kullanıcıların online olarak araç kiralama işlemlerini gerçekleştirebilmelerini sağlayan kapsamlı bir web uygulamasıdır. Sistem, kullanıcı dostu arayüzü ve güvenli backend altyapısı ile modern bir araç kiralama deneyimi sunar.

## Proje Yapısı

Proje, frontend ve backend olmak üzere iki ana bölümden oluşmaktadır:

- **Backend**: Django REST Framework ile geliştirilmiş API
- **Frontend**: React.js ile geliştirilmiş kullanıcı arayüzü

## Gereksinimler

### Backend

- Python 3.8+
- Django 4.2.7
- Django REST Framework 3.14.0
- Django CORS Headers 4.3.0
- djangorestframework-simplejwt 5.3.0
- Python-dotenv 1.0.0
- Pillow 10.1.0

### Frontend

- Node.js 18+
- React 18+
- React Router DOM
- Axios

## Kurulum

### Backend Kurulumu

1. Python ve pip'in güncel versiyonlarını yükleyin
2. Sanal ortamı oluşturun ve aktif edin:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. Gerekli paketleri yükleyin:

```bash
pip install -r requirements.txt
```

4. Veritabanı migrasyonlarını yapın:

```bash
python manage.py migrate
```

5. Sunucuyu çalıştırın:

```bash
python manage.py runserver
```

### Frontend Kurulumu

1. Node.js'in güncel versiyonunu yükleyin
2. Gerekli paketleri yükleyin:

```bash
cd frontend
npm install
```

3. Frontend uygulamasını çalıştırın:

```bash
npm start
```

## Proje Özellikleri

- **Kullanıcı Kimlik Doğrulama**: Güvenli kayıt, giriş ve şifre sıfırlama sistemi
- **Araç Yönetimi**: Kapsamlı araç listeleme, filtreleme ve arama özellikleri
- **Kiralama Sistemi**: Kolay ve hızlı araç kiralama işlemleri
- **Kullanıcı Profili**: Kişisel bilgi yönetimi ve kiralama geçmişi
- **Responsive Tasarım**: Tüm cihazlarda uyumlu kullanıcı arayüzü

## Sprint Planlaması

### Sprint 1
- Kullanıcı kimlik doğrulama sistemi (login, register, şifre sıfırlama)
- Temel araç yönetimi ve listeleme
- Proje altyapısının kurulması

### Sprint 2
- Kiralama sistemi geliştirme
- Kullanıcı profil yönetimi
- Arayüz iyileştirmeleri ve kullanıcı deneyimi optimizasyonu
- Test ve hata düzeltmeleri

## Ekran Görüntüleri

Aşağıda uygulamanın çeşitli sayfalarından ekran görüntüleri bulunmaktadır:

### Ana Sayfa ve Araç Listesi
![Ana Sayfa](mock/Screenshot%202025-05-28%20at%2007.35.19.png)

### Kullanıcı Girişi
![Giriş Sayfası](mock/Screenshot%202025-05-28%20at%2007.35.10.png)

### Araç Detay Sayfası
![Araç Detayları](mock/Screenshot%202025-05-28%20at%2007.35.01.png)

### Kiralama Formu
![Kiralama Formu](mock/Screenshot%202025-05-28%20at%2007.34.50.png)

### Kullanıcı Profili
![Kullanıcı Profili](mock/Screenshot%202025-05-28%20at%2007.34.26.png)

### Kiralama Geçmişi
![Kiralama Geçmişi](mock/Screenshot%202025-05-28%20at%2007.34.04.png)

### Kayıt Sayfası
![Kayıt Sayfası](mock/Screenshot%202025-05-28%20at%2007.33.56.png)

## Teknoloji Stack'i

### Backend
- **Framework**: Django REST Framework
- **Veritabanı**: SQLite (geliştirme), PostgreSQL (production)
- **Kimlik Doğrulama**: JWT (JSON Web Tokens)
- **API Dokümantasyonu**: Django REST Framework browsable API

### Frontend
- **Framework**: React.js
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3, Bootstrap

## Geliştirme Süreci

Bu proje, **SOFT3112.1 Software Development Practice** dersi kapsamında aşağıdaki yazılım geliştirme pratikleri uygulanarak geliştirilmiştir:

- **Agile Metodoloji**: 2 sprint halinde iteratif geliştirme
- **Version Control**: Git ile kaynak kod yönetimi
- **API-First Approach**: Backend ve frontend ayrımı
- **Responsive Design**: Mobil uyumlu tasarım
- **Code Review**: Kod kalitesi ve standartları
- **Testing**: Unit ve integration testleri

## Katkıda Bulunanlar

**TECHSAN Ekibi** - SOFT3112.1 Software Development Practice Dersi

---

*Bu proje, eğitim amaçlı olarak geliştirilmiş olup, gerçek ticari kullanım için ek güvenlik ve performans optimizasyonları gerekebilir.* 