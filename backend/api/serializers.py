from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Car
from drf_yasg.utils import swagger_serializer_method
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import get_user_model
import random
import string

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=False,
        style={'input_type': 'password'},
        help_text="Şifre"
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=False,
        style={'input_type': 'password'},
        help_text="Şifre tekrarı"
    )
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 
                 'phone', 'address', 'profile_picture', 'birth_date', 'city', 
                 'gender', 'role', 'birth_country']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'profile_picture': {'required': False},
            'birth_date': {'required': True, 'format': '%Y-%m-%d', 'help_text': 'YYYY-MM-DD formatında olmalıdır.'},
            'city': {'required': True, 'help_text': 'Geçerli bir şehir seçin (adana, istanbul, ankara vb.)'},
            'phone': {'required': True},
            'address': {'required': False},
            'gender': {'required': True},
            'birth_country': {'required': True},
            'role': {'required': False, 'default': 'end_user'}
        }
    
    def validate(self, attrs):
        # Şifre kontrolü sadece şifre alanları varsa yapılacak
        if 'password' in attrs and 'password2' in attrs:
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({"password": "Şifreler eşleşmiyor!"})
            
            # Şifre uzunluğunu kontrol et
            if len(attrs['password']) < 8:
                raise serializers.ValidationError({"password": "Şifre en az 8 karakter olmalıdır."})
        
        # E-posta kontrolü
        if CustomUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Bu e-posta adresi zaten kullanılıyor."})
            
        return attrs
    
    def create(self, validated_data):
        # password2 alanını kaldır
        validated_data.pop('password2', None)
        
        # Boş profil resmi yüklenmemesi için kontrol
        if not validated_data.get('profile_picture'):
            validated_data.pop('profile_picture', None)
            
        # Doğum tarihi girilmezse kaldır
        if not validated_data.get('birth_date'):
            validated_data.pop('birth_date', None)
            
        # Cinsiyet girilmezse varsayılan değer ata
        if not validated_data.get('gender'):
            validated_data.pop('gender', None)
            
        # Doğum ülkesi girilmezse varsayılan değer ata
        if not validated_data.get('birth_country'):
            validated_data.pop('birth_country', None)
        
        # Email'i username olarak kullan
        email = validated_data.get('email')
        
        # Kullanıcıyı oluştur (şifresiz olarak)
        user = CustomUser.objects.create(username=email, **validated_data)
        
        # Eğer şifre girildiyse ayarla
        if 'password' in validated_data:
            password = validated_data.pop('password')
            user.set_password(password)
            user.save()
        else:
            # Rastgele bir geçici şifre oluştur (kullanıcı daha sonra şifre oluşturma linkiyle değiştirecek)
            temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
            user.set_password(temp_password)
            user.save()
        
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        help_text="Kullanıcı e-posta adresi"
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        help_text="Kullanıcı şifresi"
    )
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            # E-posta adresine sahip kullanıcıyı kontrol et
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError(
                    {"email": "Bu e-posta adresine sahip kullanıcı bulunamadı."}
                )
                
            # Kullanıcı adı ve şifre doğrulaması
            if not user.check_password(password):
                raise serializers.ValidationError(
                    {"password": "Geçersiz şifre."}
                )
                
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError(
                {"error": "E-posta ve şifre alanları gereklidir."}
            )

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        help_text="Şifre sıfırlama için kullanıcı e-posta adresi"
    )
    
    def validate(self, attrs):
        email = attrs.get('email')
        
        if email:
            # E-posta adresine sahip kullanıcıyı kontrol et
            try:
                user = CustomUser.objects.get(email=email)
                attrs['user'] = user
                return attrs
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError(
                    {"email": "Bu e-posta adresine sahip kullanıcı bulunamadı."}
                )
        else:
            raise serializers.ValidationError(
                {"error": "E-posta alanı gereklidir."}
            )

class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(
        required=True, 
        min_length=8,
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, attrs):
        # Şifrelerin eşleşip eşleşmediğini kontrol et
        if attrs.get('new_password') != attrs.get('confirm_password'):
            raise serializers.ValidationError(
                {"error": "Şifreler eşleşmiyor."}
            )
        
        # Token'ın ve kullanıcı ID'sinin geçerliliğini kontrol et
        try:
            uid = force_str(urlsafe_base64_decode(attrs.get('uid')))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            raise serializers.ValidationError(
                {"error": "Geçersiz kullanıcı ID'si."}
            )
        
        # Token'ın geçerliliğini kontrol et
        if not default_token_generator.check_token(user, attrs.get('token')):
            raise serializers.ValidationError(
                {"error": "Geçersiz veya süresi dolmuş token."}
            )
        
        attrs['user'] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'birth_date', 'gender', 'role', 'birth_country', 'profile_picture']
        read_only_fields = ['email', 'role']  # Email ve role değiştirilemez

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'},
        help_text="Mevcut şifre"
    )
    new_password = serializers.CharField(
        required=True,
        min_length=8,
        validators=[validate_password],
        style={'input_type': 'password'},
        help_text="Yeni şifre en az 8 karakter olmalıdır."
    )
    
    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Mevcut şifre yanlış.")
        return value
        
    def validate(self, attrs):
        if attrs['current_password'] == attrs['new_password']:
            raise serializers.ValidationError({"new_password": "Yeni şifre eski şifre ile aynı olamaz."})
        return attrs

class CreatePasswordSerializer(serializers.Serializer):
    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True, 
        min_length=8,
        style={'input_type': 'password'},
        help_text="Şifre en az 8 karakter olmalıdır."
    )
    password2 = serializers.CharField(
        required=True,
        style={'input_type': 'password'},
        help_text="Şifre tekrarı"
    )
    
    def validate(self, attrs):
        # Şifrelerin eşleşip eşleşmediğini kontrol et
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError(
                {"error": "Şifreler eşleşmiyor."}
            )
        
        # Token'ın ve kullanıcı ID'sinin geçerliliğini kontrol et
        try:
            uid = force_str(urlsafe_base64_decode(attrs.get('uid')))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            raise serializers.ValidationError(
                {"error": "Geçersiz kullanıcı ID'si."}
            )
        
        # Token'ın geçerliliğini kontrol et
        if not default_token_generator.check_token(user, attrs.get('token')):
            raise serializers.ValidationError(
                {"error": "Geçersiz veya süresi dolmuş token."}
            )
        
        attrs['user'] = user
        return attrs

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'brand', 'model', 'year', 'plate_number', 'daily_price', 
                 'car_type', 'status', 'description', 'color', 'seat_count', 
                 'fuel_type', 'transmission', 'image', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    
    def validate_plate_number(self, value):
        # Plaka numarasının benzersiz olup olmadığını kontrol et
        # Eğer bu bir güncelleme ise, aynı plaka numarasına sahip olan araç bu araç mı kontrol et
        instance = getattr(self, 'instance', None)
        if Car.objects.filter(plate_number=value).exclude(pk=getattr(instance, 'pk', None)).exists():
            raise serializers.ValidationError("Bu plaka numarası zaten kullanılıyor.")
        return value