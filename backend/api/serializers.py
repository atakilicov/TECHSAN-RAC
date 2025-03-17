from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser
from drf_yasg.utils import swagger_serializer_method

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        style={'input_type': 'password'},
        help_text="Şifre en az 8 karakter olmalıdır."
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        style={'input_type': 'password'},
        help_text="Şifre tekrarı"
    )
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 
                 'phone', 'address', 'profile_picture', 'birth_date', 'city']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'profile_picture': {'required': False},
            'birth_date': {'required': True, 'format': '%Y-%m-%d', 'help_text': 'YYYY-MM-DD formatında olmalıdır.'},
            'city': {'required': True, 'help_text': 'Geçerli bir şehir seçin (adana, istanbul, ankara vb.)'},
            'phone': {'required': True},
            'address': {'required': False}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Şifreler eşleşmiyor!"})
        
        if CustomUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Bu e-posta adresi zaten kullanılıyor."})
        
        # Şifre uzunluğunu kontrol et
        if len(attrs['password']) < 8:
            raise serializers.ValidationError({"password": "Şifre en az 8 karakter olmalıdır."})
            
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
        
        # password'ü ayır
        password = validated_data.pop('password')
        
        # Email'i username olarak kullan
        email = validated_data.get('email')
        
        # Kullanıcıyı oluştur
        user = CustomUser.objects.create(username=email, **validated_data)
        
        # Şifreyi ayarla
        user.set_password(password)
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