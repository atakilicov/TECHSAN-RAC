from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.choices import CarChoices

class CarAllOptionsView(APIView):
    def get(self, request):
        options = {
            'car_types': [{'value': val, 'label': label} for val, label in CarChoices.CAR_TYPES],
            'fuel_types': [{'value': val, 'label': label} for val, label in CarChoices.FUEL_TYPES],
            'transmission_types': [{'value': val, 'label': label} for val, label in CarChoices.TRANSMISSION_CHOICES],
            'car_status': [{'value': val, 'label': label} for val, label in CarChoices.CAR_STATUS]
            # İhtiyaç duyulan diğer seçenekler buraya eklenebilir
        }
        return Response(options, status=status.HTTP_200_OK) 