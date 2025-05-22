class CarChoices:
    CAR_TYPES = [
        ('sedan', 'Sedan'),
        ('hatchback', 'Hatchback'),
        ('suv', 'SUV'),
        ('crossover', 'Crossover'),
        ('mpv', 'MPV'),
        ('coupe', 'Coupe'),
        ('convertible', 'Convertible'),
        ('pickup', 'Pickup Truck'),
        ('van', 'Van'),
        ('minivan', 'Minivan'),
    ]

    FUEL_TYPES = [
        ('gasoline', 'Benzin'),
        ('diesel', 'Dizel'),
        ('hybrid', 'Hibrit'),
        ('electric', 'Elektrik'),
        ('lpg', 'LPG'),
    ]

    TRANSMISSION_CHOICES = [
        ('manual', 'Manuel'),
        ('automatic', 'Otomatik'),
    ]

    CAR_STATUS = [
        ('available', 'Müsait'),
        ('rented', 'Kiralandı'),
        ('maintenance', 'Bakımda'),
        ('unavailable', 'Kullanım Dışı'),
    ]

class CustomUserChoices:
    TURKISH_CITIES = [
        ('istanbul', 'İstanbul'),
        ('ankara', 'Ankara'),
        ('izmir', 'İzmir'),
        ('bursa', 'Bursa'),
        ('antalya', 'Antalya'),
        ('adana', 'Adana'),
        ('gaziantep', 'Gaziantep'),
        ('konya', 'Konya'),
        ('mersin', 'Mersin'),
        ('diyarbakir', 'Diyarbakır'),
    ]

    GENDER_CHOICES = [
        ('male', 'Erkek'),
        ('female', 'Kadın'),
        ('other', 'Diğer'),
    ]

    USER_ROLES = [
        ('admin', 'Admin'),
        ('staff', 'Personel'),
        ('end_user', 'Kullanıcı'),
    ] 