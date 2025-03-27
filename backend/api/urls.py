from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import RegisterView, EmailTokenObtainPairView, LoginView, ForgotPasswordView, ResetPasswordView, CitiesView, UserProfileUpdateView

urlpatterns = [
    # Kullanıcı işlemleri
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    
    # Genel
    path('cities/', CitiesView.as_view(), name='cities'),
    path('users/profile/', UserProfileUpdateView.as_view(), name='user-profile'),
] 