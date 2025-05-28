from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import RegisterView, EmailTokenObtainPairView, LoginView, ForgotPasswordView, ResetPasswordView, CitiesView, UserProfileUpdateView, ChangePasswordView, DeleteAccountView, CreatePasswordView, LogoutView, CarViewSet

# ViewSet'ler için router tanımlama
router = DefaultRouter()
router.register(r'cars', CarViewSet, basename='car')

urlpatterns = [
    # Kullanıcı işlemleri
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('create-password/', CreatePasswordView.as_view(), name='create-password'),
    path('users/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('users/delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    
    # Genel
    path('cities/', CitiesView.as_view(), name='cities'),
    path('users/profile/', UserProfileUpdateView.as_view(), name='user-profile'),
    
    # Araç seçenekleri için özel endpoint
    path('cars/options/', CarViewSet.as_view({'get': 'get_car_options'}), name='car-options'),
    
    # ViewSet'ler için rotaları dahil et
    path('', include(router.urls)),
] 