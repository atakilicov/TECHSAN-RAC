from django.db import models
from django.core.validators import MinValueValidator
from api.choices import CarChoices

class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    plate_number = models.CharField(max_length=15, unique=True, default='DEFAULTPLATE') 
    color = models.CharField(max_length=50, blank=True)
    seat_count = models.IntegerField(default=5)
    description = models.TextField(blank=True)
    car_type = models.CharField(max_length=20, choices=CarChoices.CAR_TYPES)
    transmission = models.CharField(max_length=20, choices=CarChoices.TRANSMISSION_CHOICES)
    fuel_type = models.CharField(max_length=20, choices=CarChoices.FUEL_TYPES)
    status = models.CharField(max_length=20, choices=CarChoices.CAR_STATUS, default='available')
    daily_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    image = models.ImageField(upload_to='cars/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"

class Reservation(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='reservations')
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.car} - {self.start_date} to {self.end_date}"

    def save(self, *args, **kwargs):
        # Kiralama süresi boyunca günlük fiyattan toplam fiyatı hesapla
        days = (self.end_date - self.start_date).days + 1
        self.total_price = self.car.daily_price * days
        super().save(*args, **kwargs) 