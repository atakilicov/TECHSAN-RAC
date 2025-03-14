from rest_framework import serializers
from django.contrib.auth.models import User

# Kullanıcı Serializer
# - Kullanıcı bilgilerini (id, username, email vb.) API'de kullanmak için serileştirme

# Register Serializer
# - Kullanıcı kaydı oluşturmak için gerekli alanları içerecek (username, email, password, vb.)
# - Parola doğrulama ve validasyon işlemleri içerecek

# UserProfile Serializer
# - Kullanıcı profil bilgilerini (telefon, adres, profil resmi) API'de kullanmak için serileştirme

# ChangePassword Serializer
# - Parola değiştirme işlemi için gerekli alanları içerecek

# Car Serializer
# - Araç bilgilerini API'de kullanmak için serileştirme

# Rental Serializer
# - Kiralama bilgilerini API'de kullanmak için serileştirme
# - Toplam ücret hesaplama mantığını içerecek 