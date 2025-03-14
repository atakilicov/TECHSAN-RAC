# TECHSAN Araç Kiralama Projesi

Bu proje, üniversite ödevi olarak geliştirilen bir araç kiralama web uygulamasıdır. Sistem, kullanıcıların araç kiralama işlemlerini gerçekleştirebilmelerini sağlar.

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

- Kullanıcı kimlik doğrulama (kayıt, giriş, şifre sıfırlama)
- Araç listeleme ve arama
- Araç kiralama
- Kullanıcı profil yönetimi
- Kiralama geçmişi

## Geliştirme Planı

1. Hafta: Kullanıcı kimlik doğrulama sistemi (login, register, şifre sıfırlama)
2. Hafta: Araç yönetimi ve listeleme
3. Hafta: Kiralama sistemi
4. Hafta: Kullanıcı profil yönetimi ve arayüz iyileştirmeleri

## Katkıda Bulunanlar

TECHSAN Ekibi 