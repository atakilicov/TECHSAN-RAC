# TECHSAN-RAC Araç Kiralama Projesi - Kurulum Rehberi

Bu rehber, TECHSAN Araç Kiralama projesini bilgisayarınızda çalıştırmak için adım adım talimatlar sunar.

## 1. Gereksinimler

Projeyi çalıştırmak için şu yazılımların bilgisayarınızda kurulu olması gerekir:

- Python 3.8 veya üzeri
- Node.js 18 veya üzeri
- npm (Node.js ile birlikte gelir)
- Git (opsiyonel, repo dosyalarını zaten almış olabilirsiniz)

## 2. Repoyu Klonlama

1. Komut İstemi (CMD) veya Terminal açın
2. Projeyi kurmak istediğiniz klasöre gidin (örneğin Masaüstü):

   ```bash
   cd Masaüstü
   ```

3. Aşağıdaki komutu yazarak repoyu klonlayın:

   ```bash
   git clone https://github.com/your-username/TECHSAN-RAC.git
   ```

4. Klonlanan klasöre girin:

   ```bash
   cd TECHSAN-RAC
   ```

## 3. Backend Kurulumu

### Sanal Ortam Oluşturma ve Etkinleştirme

1. Proje klasöründeyken sanal ortam oluşturun:

   **Windows için:**
   ```bash
   python -m venv env
   ```

   **macOS/Linux için:**
   ```bash
   python3 -m venv env
   ```

2. Sanal ortamı etkinleştirin:

   **Windows için:**
   ```bash
   env\Scripts\activate
   ```

   **macOS/Linux için:**
   ```bash
   source env/bin/activate
   ```

   İşlem başarılı olduğunda, komut satırı başında `(env)` yazısını göreceksiniz.

### Backend Bağımlılıklarını Yükleme

1. Backend klasörüne gidin:

   ```bash
   cd backend
   ```

2. **requirements.txt** dosyasındaki tüm bağımlılıkları yükleyin:

   ```bash
   pip install -r requirements.txt
   ```

   Eğer bu komut çalışmazsa, Python sürümünüze göre aşağıdaki alternatif komutları deneyin:
   ```bash
   pip3 install -r requirements.txt
   ```
   
   veya
   
   ```bash
   python -m pip install -r requirements.txt
   ```

3. Veritabanı tabloları oluşturup migrate edin:

   ```bash
   python manage.py migrate
   ```

## 4. Frontend Kurulumu

1. Yeni bir Komut İstemi veya Terminal penceresi açın
2. Proje klasörüne gidin:

   ```bash
   cd TECHSAN-RAC
   ```

3. Frontend klasörüne girin:

   ```bash
   cd frontend
   ```

4. Gerekli npm paketlerini yükleyin:

   ```bash
   npm install
   ```

   Bu işlem biraz zaman alabilir, lütfen sabırlı olun.

## 5. Projeyi Çalıştırma

### Backend Sunucusunu Başlatma

1. İlk terminal penceresinde, backend klasöründe olduğunuzdan emin olun
2. Sanal ortamın etkin olduğundan emin olun
3. Django sunucusunu başlatın:

   ```bash
   python manage.py runserver
   ```

4. Tarayıcınızı açın ve şu adrese gidin: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
5. Admin paneline aşağıdaki bilgilerle giriş yapın:
   - Kullanıcı adı: **techsanadmin**
   - Şifre: **techsanadmin**

### Frontend Sunucusunu Başlatma

1. İkinci terminal penceresinde, frontend klasöründe olduğunuzdan emin olun
2. React uygulamasını başlatın:

   ```bash
   npm start
   ```

3. Tarayıcınız otomatik olarak açılacak ve [http://localhost:3000](http://localhost:3000) adresinde uygulama görüntülenecek

## 6. Sık Karşılaşılan Sorunlar ve Çözümleri

### Python veya pip komutu bulunamadı

- Python yüklü olduğundan emin olun
- PATH ayarlarının doğru olduğundan emin olun
- Windows'ta `python3` yerine `python` kullanın
- macOS/Linux'ta `python` yerine `python3` kullanın

### ModuleNotFoundError hatası

Eğer requirements.txt yükledikten sonra bir modül hatası alırsanız, setuptools paketini kurun:

```bash
pip install setuptools
```

### Node modül hataları

Node modüllerinde sorun yaşarsanız, node_modules klasörünü silip yeniden yükleyin:

```bash
rm -rf node_modules
npm install
```

### CORS hatası

Frontend backend'e bağlanamazsa, backend'in çalıştığından emin olun ve CORS ayarlarını kontrol edin.

## 7. Yardım

Herhangi bir sorunla karşılaşırsanız, ekip liderinize danışmaktan çekinmeyin! 