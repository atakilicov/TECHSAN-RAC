from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Car

class CustomUserAdmin(UserAdmin):
    # Admin panelinde listelenecek alanlar
    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
    
    # Filtreleme seçenekleri
    list_filter = ('role', 'is_staff', 'is_active')
    
    # Arama yapılacak alanlar
    search_fields = ('email', 'username', 'first_name', 'last_name')
    
    # Sıralama
    ordering = ('email',)
    
    # Detay sayfasındaki alan grupları
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Kişisel Bilgiler', {'fields': ('first_name', 'last_name', 'phone', 'address', 'birth_date', 'city', 'gender', 'birth_country', 'profile_picture')}),
        ('Rol ve İzinler', {'fields': ('role', 'is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    # Kullanıcı eklerken görünecek alanlar
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')}
        ),
    )

class CarAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'year', 'plate_number', 'daily_price', 'car_type', 'status']
    list_filter = ['car_type', 'status', 'fuel_type', 'transmission', 'year']
    search_fields = ['brand', 'model', 'plate_number', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Temel Bilgiler', {
            'fields': ('brand', 'model', 'year', 'plate_number', 'daily_price')
        }),
        ('Araç Özellikleri', {
            'fields': ('car_type', 'status', 'color', 'seat_count', 'fuel_type', 'transmission')
        }),
        ('Açıklama ve Görsel', {
            'fields': ('description', 'image')
        }),
        ('Sistem Bilgileri', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

# CustomUser modelini özel admin sınıfıyla kaydet
admin.site.register(CustomUser, CustomUserAdmin) 
admin.site.register(Car, CarAdmin) 