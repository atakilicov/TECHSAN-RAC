from django.shortcuts import render
from rest_framework import viewsets, status, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .serializers import RegisterSerializer
from .models import CustomUser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Araç işlemleri için view'lar
# - Araçları listeleme
# - Araç detayı görüntüleme
# - Araç filtreleme ve arama

# Kiralama işlemleri için view'lar
# - Kiralama oluşturma
# - Kiralama listesi görüntüleme
# - Kiralama durumu güncelleme

