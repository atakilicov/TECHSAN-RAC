from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from .choices import CarChoices, CustomUserChoices
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

class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    plate_number = models.CharField(max_length=15, unique=True)
    daily_price = models.DecimalField(max_digits=10, decimal_places=2)
    car_type = models.CharField(max_length=50, choices=CarChoices.CAR_TYPES)
    status = models.CharField(max_length=20, choices=CarChoices.CAR_STATUS, default='available')
    description = models.TextField(blank=True)
    color = models.CharField(max_length=50, blank=True)
    seat_count = models.IntegerField(default=5)
    fuel_type = models.CharField(max_length=50, choices=CarChoices.FUEL_TYPES)
    transmission = models.CharField(max_length=50, choices=CarChoices.TRANSMISSION_CHOICES)
    image = models.ImageField(upload_to='cars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.plate_number})"



