from django.db import models
from django.contrib.auth.models import User

# Kullanıcı Profil Modeli
# - Kullanıcıya ait ek bilgileri içerecek (telefon, adres, profil resmi)
# - Django'nun varsayılan User modeline bağlanacak

# Araç Modeli
# - Araçların bilgilerini içerecek (marka, model, yıl, günlük ücret)
# - Araç türleri ve durumları için seçenekler içerecek

# Kiralama Modeli
# - Kullanıcı ve kiralanan araç arasındaki ilişkiyi tutacak
# - Başlangıç-bitiş tarihi, toplam ücret, durum bilgilerini içerecek
