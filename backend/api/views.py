from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView

# Kullanıcı işlemleri için view'lar
# - Kullanıcı kaydı (register)
# - Kullanıcı girişi (login - JWT token kullanılacak)
# - Kullanıcı profili görüntüleme ve güncelleme
# - Şifre değiştirme

# Araç işlemleri için view'lar
# - Araçları listeleme
# - Araç detayı görüntüleme
# - Araç filtreleme ve arama

# Kiralama işlemleri için view'lar
# - Kiralama oluşturma
# - Kiralama listesi görüntüleme
# - Kiralama durumu güncelleme
