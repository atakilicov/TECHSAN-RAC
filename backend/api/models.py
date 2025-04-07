from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from .choice import CustomUserChoices
# Kullanıcı Profil Modeli
# - Kullanıcıya ait ek bilgileri içerecek (telefon, adres, profil resmi)
# - Django'nun varsayılan User modeline bağlanacak

# Araç Modeli
# - Araçların bilgilerini içerecek (marka, model, yıl, günlük ücret)
# - Araç türleri ve durumları için seçenekler içerecek

# Kiralama Modeli
# - Kullanıcı ve kiralanan araç arasındaki ilişkiyi tutacak
# - Başlangıç-bitiş tarihi, toplam ücret, durum bilgilerini içerecek

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='i/', blank=True)
    birth_date = models.DateField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, choices=CustomUserChoices.TURKISH_CITIES)
    gender = models.CharField(max_length=10, blank=True, choices=CustomUserChoices.GENDER_CHOICES)
    role = models.CharField(max_length=10, default='end_user', choices=CustomUserChoices.USER_ROLES)
    birth_country = models.CharField(max_length=100, blank=True)



