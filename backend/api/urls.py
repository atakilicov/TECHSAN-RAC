from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import RegisterView, EmailTokenObtainPairView, LoginView, ForgotPasswordView, CitiesView

urlpatterns = [
    # Kullanıcı işlemleri
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    
    # Genel
    path('cities/', CitiesView.as_view(), name='cities'),
] 