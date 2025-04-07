from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Admin panelinde listelenecek alanlar
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
    
    # Filtreleme seçenekleri
    list_filter = ('role', 'is_staff', 'is_active')
    
    # Arama yapılacak alanlar
    search_fields = ('email', 'first_name', 'last_name')
    
    # Sıralama
    ordering = ('email',)
    
    # Detay sayfasındaki alan grupları
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Kişisel Bilgiler', {'fields': ('first_name', 'last_name', 'gender', 'birth_date', 'birth_country')}),
        ('İletişim Bilgileri', {'fields': ('phone', 'address', 'city')}),
        ('Rol ve İzinler', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Önemli Tarihler', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Kullanıcı eklerken görünecek alanlar
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_staff', 'is_active')}
        ),
    )

# CustomUser modelini özel admin sınıfıyla kaydet
admin.site.register(CustomUser, CustomUserAdmin) 