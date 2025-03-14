from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# URL kalıplarını tanımlayın
urlpatterns = [
    # Kullanıcı kimlik doğrulama URL'leri
    # - Login (JWT token alımı için)
    # - Register (Yeni kullanıcı kaydı)
    # - Profile (Kullanıcı profili işlemleri)
    # - Change Password (Şifre değiştirme)
    
    # Araç URL'leri
    # - Araç listesi
    # - Araç detayı
    # - Araç arama ve filtreleme
    
    # Kiralama URL'leri
    # - Kiralama oluşturma
    # - Kiralama listesi
    # - Kiralama durumu güncelleme
] 