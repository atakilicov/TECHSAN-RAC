from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from cars.models import Car
from django.db.models import Min, Max
from api.choices import CarChoices

class CarFilterOptionsView(APIView):
    def get(self, request):
        # Veritabanından gelen seçenekler
        brands = list(Car.objects.values_list('brand', flat=True).distinct()) or []
        years = sorted(list(Car.objects.values_list('year', flat=True).distinct())) or []
        
        filter_options = {
            'brands': brands,
            'carTypes': [{'value': val, 'label': label} for val, label in CarChoices.CAR_TYPES],
            'years': years
        }
        
        return Response(filter_options, status=status.HTTP_200_OK) 