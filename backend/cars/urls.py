from django.urls import path
from .views.filter_options_view import CarFilterOptionsView
from .views.car_views import CarListView, CarDetailView, CarSearchView

urlpatterns = [
    path('', CarListView.as_view(), name='car_list'),
    path('<int:pk>/', CarDetailView.as_view(), name='car_detail'),
    path('search/', CarSearchView.as_view(), name='car_search'),
    path('filter-options/', CarFilterOptionsView.as_view(), name='car_filter_options'),
] 