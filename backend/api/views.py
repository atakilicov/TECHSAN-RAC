from django.shortcuts import render
from rest_framework import viewsets, status, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, UserSerializer
from .models import CustomUser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail, EmailMessage
import random
import string
from .choice import CustomUserChoices
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.conf import settings

# Kullanıcı işlemleri için view'lar
# - Kullanıcı kaydı (register)
# - Kullanıcı girişi (login - JWT token kullanılacak)
# - Kullanıcı profili görüntüleme ve güncelleme
# - Şifre değiştirme

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            # E-posta adresine sahip kullanıcıyı bul
            try:
                user = CustomUser.objects.get(email=email)
                # Kullanıcı adı olarak e-posta adresini kullan
                attrs['username'] = user.username
            except CustomUser.DoesNotExist:
                pass
        
        return super().validate(attrs)

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    
    @swagger_auto_schema(
        operation_description="E-posta adresi ve şifre ile token alır",
        operation_summary="Token al (E-posta ile)",
        tags=["Kullanıcı İşlemleri"],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL, description='E-posta adresi'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_PASSWORD, description='Şifre'),
            }
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description="Token başarıyla oluşturuldu",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Yenileme token\'ı'),
                        'access': openapi.Schema(type=openapi.TYPE_STRING, description='Erişim token\'ı'),
                    }
                )
            ),
            status.HTTP_401_UNAUTHORIZED: "Geçersiz kimlik bilgileri"
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    
    @swagger_auto_schema(
        operation_description="Yeni kullanıcı kaydı oluşturur. E-posta adresi kullanıcı adı olarak kullanılır.",
        operation_summary="Kullanıcı kaydı",
        tags=["Kullanıcı İşlemleri"],
        request_body=RegisterSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response(
                description="Kullanıcı başarıyla oluşturuldu",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(type=openapi.TYPE_OBJECT, description='Kullanıcı bilgileri'),
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Başarı mesajı'),
                        'tokens': openapi.Schema(type=openapi.TYPE_OBJECT, description='JWT token bilgileri'),
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: "Geçersiz veri"
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # JWT token oluştur
            refresh = RefreshToken.for_user(user)
            
            # Kullanıcıdan şifre alanlarını kaldırıyoruz
            user_data = serializer.data
            if 'password' in user_data:
                del user_data['password']
            if 'password2' in user_data:
                del user_data['password2']
            
            return Response({
                "user": user_data,
                "message": "Kullanıcı başarıyla oluşturuldu",
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                },
                "redirect_url": "/homepage"  # Yönlendirme URL'si
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    
    @swagger_auto_schema(
        operation_description="Kullanıcı girişi yapar ve JWT token döndürür",
        operation_summary="Kullanıcı girişi",
        tags=["Kullanıcı İşlemleri"],
        request_body=LoginSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description="Giriş başarılı",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(type=openapi.TYPE_OBJECT, description='Kullanıcı bilgileri'),
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Başarı mesajı'),
                        'tokens': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Yenileme token\'ı'),
                                'access': openapi.Schema(type=openapi.TYPE_STRING, description='Erişim token\'ı'),
                            }
                        ),
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: "Geçersiz kimlik bilgileri",
            status.HTTP_401_UNAUTHORIZED: "Giriş başarısız"
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # JWT token oluştur
            refresh = RefreshToken.for_user(user)
            
            # Kullanıcı bilgilerini hazırla
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': user.phone,
                'address': user.address,
                'city': user.city,
            }
            
            if user.profile_picture:
                user_data['profile_picture'] = request.build_absolute_uri(user.profile_picture.url)
            
            return Response({
                "user": user_data,
                "message": "Giriş başarılı",
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                },
                "redirect_url": "/homepage"  # Yönlendirme URL'si
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        operation_description="Kullanıcının şifresini sıfırlaması için e-posta gönderir",
        operation_summary="Şifremi Unuttum",
        tags=["Kullanıcı İşlemleri"],
        request_body=ForgotPasswordSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description="Şifre sıfırlama e-postası gönderildi",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Başarı mesajı'),
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: "Geçersiz e-posta adresi",
            status.HTTP_404_NOT_FOUND: "Kullanıcı bulunamadı",
            status.HTTP_500_INTERNAL_SERVER_ERROR: "E-posta gönderme hatası"
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Şifre sıfırlama token'ı oluştur
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # Frontend URL'sini oluştur
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
            
            # E-posta gönder
            try:
                html_content = f"""
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background-color: #4CAF50; color: white; padding: 10px; text-align: center; }}
                        .content {{ padding: 20px; border: 1px solid #ddd; }}
                        .button {{ 
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 15px;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Şifre Sıfırlama</h2>
                        </div>
                        <div class="content">
                            <p>Merhaba {user.first_name} {user.last_name},</p>
                            <p>Şifre sıfırlama talebinizi aldık. Aşağıdaki bağlantıya tıklayarak yeni şifrenizi oluşturabilirsiniz:</p>
                            <p><a href="{reset_url}" class="button">Şifremi Sıfırla</a></p>
                            <p>Veya aşağıdaki bağlantıyı tarayıcınıza kopyalayabilirsiniz:</p>
                            <p>{reset_url}</p>
                            <p>Bu bağlantı 24 saat boyunca geçerlidir.</p>
                            <p>Eğer bu talebi siz yapmadıysanız, lütfen bizimle iletişime geçin.</p>
                            <p>Saygılarımızla,<br>TECHSAN Ekibi</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                email = EmailMessage(
                    subject="Şifre Sıfırlama",
                    body=html_content,
                    from_email="limonata0712@gmail.com",
                    to=[user.email],
                )
                email.content_subtype = "html"  # HTML içerik olarak belirt
                email.send(fail_silently=False)
                
                return Response({
                    "message": "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    "error": f"E-posta gönderilirken bir hata oluştu: {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        operation_description="Kullanıcının şifresini sıfırlar",
        operation_summary="Şifre Sıfırlama",
        tags=["Kullanıcı İşlemleri"],
        request_body=ResetPasswordSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description="Şifre başarıyla sıfırlandı",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Başarı mesajı'),
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: "Geçersiz token veya şifre",
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            new_password = serializer.validated_data['new_password']
            
            # Kullanıcının şifresini güncelle
            user.set_password(new_password)
            user.save()
            
            return Response({
                "message": "Şifreniz başarıyla sıfırlandı.",
                "redirect_url": "/login"
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def generate_random_password(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# Araç işlemleri için view'lar
# - Araçları listeleme
# - Araç detayı görüntüleme
# - Araç filtreleme ve arama

# Kiralama işlemleri için view'lar
# - Kiralama oluşturma
# - Kiralama listesi görüntüleme
# - Kiralama durumu güncelleme

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="Kullanıcı çıkışı yapar",
        operation_summary="Kullanıcı çıkışı",
        tags=["Kullanıcı İşlemleri"],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description="Çıkış başarılı",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Başarı mesajı'),
                    }
                )
            ),
        }
    )
    def post(self, request):
        # JWT kullanıldığı için backend'de özel bir işlem yapmaya gerek yok
        # Frontend'de token'lar silindiği sürece kullanıcı çıkış yapmış sayılır
        return Response({"message": "Çıkış başarılı"}, status=status.HTTP_200_OK)

# Şehirler listesi için API endpoint
class CitiesView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        operation_description="Türkiye'deki şehirlerin listesini döndürür",
        operation_summary="Şehirler Listesi",
        tags=["Genel"],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description="Şehirler listesi",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'value': openapi.Schema(type=openapi.TYPE_STRING, description='Şehir değeri'),
                            'label': openapi.Schema(type=openapi.TYPE_STRING, description='Şehir etiketi'),
                        }
                    )
                )
            )
        }
    )
    def get(self, request):
        # Türkiye şehirlerini döndür
        cities = [{"value": city[0], "label": city[1]} for city in CustomUserChoices.TURKISH_CITIES]
        return Response(cities, status=status.HTTP_200_OK)

class UserProfileUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        """Kullanıcı profil bilgilerini getir"""
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        """Kullanıcı profil bilgilerini güncelle"""
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

