from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from cars.models import Car
from cars.serializers.car_serializer import CarSearchSerializer, CarDetailSerializer, CarCreateSerializer

class CarListView(APIView):
    def get(self, request):
        # Tüm araçları listele
        cars = Car.objects.all()
        serializer = CarSearchSerializer(cars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Yeni araç oluştur
        serializer = CarCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CarDetailView(APIView):
    def get(self, request, pk):
        # Belirli bir aracın detaylarını getir
        car = get_object_or_404(Car, pk=pk)
        serializer = CarDetailSerializer(car)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CarSearchView(APIView):
    def get(self, request):
        # Parametreleri al
        brand = request.query_params.get('brand')
        year = request.query_params.get('year')
        car_type = request.query_params.get('car_type')
        # Diğer parametreler (transmission, fuel_type, min_price, max_price, start_date, end_date) kaldırıldı

        # Temel queryset
        queryset = Car.objects.all()

        # Filtreleme kriterleri
        if brand:
            queryset = queryset.filter(brand__icontains=brand)
        
        if year:
            queryset = queryset.filter(year=year) # Yıl için exact match daha uygun olabilir

        if car_type:
            queryset = queryset.filter(car_type__iexact=car_type)
        
        # Diğer filtreleme koşulları (transmission, fuel_type, price) kaldırıldı

        # Serializer ile yanıt oluştur
        serializer = CarSearchSerializer(queryset, many=True)
        
        return Response({
            'cars': serializer.data,
            'total_results': queryset.count()
        }, status=status.HTTP_200_OK) 